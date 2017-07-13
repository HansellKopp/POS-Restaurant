'use strict'

module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define('Table', {
    number: { 
      type: DataTypes.STRING,
      unique: true,
      validate: {
         notEmpty: true
      }
    },
    place: {
      type:  DataTypes.STRING,
      validate: {
         notEmpty: true
      }
    },
    seats: DataTypes.INTEGER
  })

  return Table
}
