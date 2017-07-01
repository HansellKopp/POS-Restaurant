'use strict'

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
       validate: { 
        notEmpty: true, 
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: { 
        isEmail: true,
        notEmpty: true, 
      }
    },
    password: {
      type: DataTypes.STRING,
       validate: { 
        notEmpty: true, 
      }
    },
  },
  
  )

  return User
}
