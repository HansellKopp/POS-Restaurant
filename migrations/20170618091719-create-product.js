'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('Products', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        number : Sequelize.INTEGER,
        description: {
          type: Sequelize.STRING(255)
        },
        image_url: {
          type: Sequelize.STRING
        },
        preise: Sequelize.DECIMAL,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: Sequelize.DATE,
        CategoryId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Categories',
            key: 'id'
          }
        }
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('Products')
  }
}
