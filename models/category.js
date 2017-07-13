'use strict'

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    description: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
          notEmpty: true
      }
    }
  })

  Category.associate = function(models) {
    Category.hasMany(models.Product);
  }

  return Category
}
