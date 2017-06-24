"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    description: DataTypes.STRING
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
