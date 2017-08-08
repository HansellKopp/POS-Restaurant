'use strict'

module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    table: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
          notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open'
    },
    printed: DataTypes.DATE,
    tax: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    serviceTax: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    }
  })

  Order.associate = function(models) {
    Order.hasMany(models.OrderDetail);
  }

  return Order
}
