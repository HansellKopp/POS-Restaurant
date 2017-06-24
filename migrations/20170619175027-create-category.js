'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Categories', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING(255),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.STRING,
          allowNull: false
        },
        updatedAt: Sequelize.DATE
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Categories')
  }
}
