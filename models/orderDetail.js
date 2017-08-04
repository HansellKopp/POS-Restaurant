"use strict";

module.exports = function(sequelize, DataTypes) {
  var OrderDetail = sequelize.define("OrderDetail", {
    number: DataTypes.INTEGER,
    description: DataTypes.STRING(255),
    tags: DataTypes.STRING,
    quantity: DataTypes.DOUBLE,
    price: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER,
  })
  
  OrderDetail.associate = function(models) {
    OrderDetail.belongsTo(models.Order, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return OrderDetail;
};
