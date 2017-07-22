"use strict";

module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    number: { 
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
         notEmpty: true
      }
    },
    description: {
      type:  DataTypes.STRING,
      validate: {
         notEmpty: true
      }
    },
    image_url:  DataTypes.STRING,
    price: DataTypes.DECIMAL
  });
  
  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
  
  return Product;
};
