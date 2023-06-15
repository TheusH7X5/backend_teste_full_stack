const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        confirm_password: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }
}

module.exports = User;
