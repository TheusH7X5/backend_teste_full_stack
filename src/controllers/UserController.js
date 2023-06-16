const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async GetAllUsers(req, res) {
    const user = await User.findAll();

    return res.json(user);
  },

  async GetUserAuthenticated(req, res) {
    const id = req.params.id;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  },

  async UserRegister(req, res) {
    const { name, email, password } = req.body;

    try {
      if (!name) {
        return res.status(422).json({ message: "The name field is required" });
      }
      if (!email) {
        return res.status(422).json({ message: "The email field is required" });
      }
      if (!password) {
        return res
          .status(422)
          .json({ message: "The password field is required" });
      }

      const emailExists = await User.findOne({ where: { email: email } });

      if (emailExists) {
        return res.status(422).json({ message: "Email already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: passwordHash,
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async UserLogin(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "The email field is required" });
    }

    if (!password) {
      return res
        .status(422)
        .json({ message: "The password field is required" });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(422).json({ message: "User does not exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Password is invalid" });
    }

    try {
      const secret = process.env.SECRET;

      const token = jwt.sign({ id: user.id }, secret);

      newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        message: "Authentication performed successfully",
      };

      res.status(200).json({ user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    try {
      const secret = process.env.SECRET;

      jwt.verify(token, secret);

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
