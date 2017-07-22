'use strict'

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    number: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
          notEmpty: true
      }
    }
  })

  Order.associate = function(models) {
    Order.hasMany(models.OrderDetail);
  }

  return Order
}
