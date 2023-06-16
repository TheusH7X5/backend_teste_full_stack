const Product = require("../models/Product");

module.exports = {
  async GetAllProducts(req, res) {
    const product = await Product.findAll();

    return res.json(product);
  },

  async ProductRegister(req, res) {
    const { name, price, photo } = req.body;

    try {
      if (!name) {
        return res.status(422).json({ message: "The name field is required" });
      }
      if (!price) {
        return res.status(422).json({ message: "The price field is required" });
      }
      if (!photo) {
        return res.status(422).json({ message: "The photo field is required" });
      }

      const newProduct = await Product.create({
        name,
        price,
        photo,
      });

      await newProduct.save();

      res
        .status(201)
        .json({
          message: "Product registered successfully",
          product: newProduct,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
