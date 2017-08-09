'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Orders', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        table: {
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
      .dropTable('Orders')
  }
}
