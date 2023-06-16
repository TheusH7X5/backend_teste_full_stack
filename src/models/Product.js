const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        photo: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Product',
      }
    );
  }
}

module.exports = Product;
