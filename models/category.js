'use strict'

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    description: DataTypes.STRING
  })

  Category.associate = function(models) {
    Category.hasMany(models.Product);
  }

  return Category
}
