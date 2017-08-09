'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Tables', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        number: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        place: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        seats: {
          type: Sequelize.INTEGER
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
      .dropTable('Categories')
  }
}