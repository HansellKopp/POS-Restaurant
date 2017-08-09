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
        code : Sequelize.STRING,
        description: {
          type: Sequelize.STRING(255)
        },
        image_url: {
          type: Sequelize.STRING
        },
        price: Sequelize.DECIMAL,
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

  down: function (queryInterface) {
    return queryInterface
      .dropTable('Products')
  }
}
