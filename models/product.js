"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    number: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image_url:  DataTypes.STRING,
    price: DataTypes.DECIMAL
  });
  
  Product.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Product.belongsTo(models.User);
    Product.belongsTo(models.Category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
  
  return Product;
};
