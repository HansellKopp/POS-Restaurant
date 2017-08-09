'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          isEmail: true,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.STRING,
          allowNull: false
        },
        updatedAt: Sequelize.DATE
      })
  },

  down: function (queryInterface) {
    return queryInterface
      .dropTable('Users')
  }
}
