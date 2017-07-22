'use strict'
// fa-list-alt
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('OrderDetails', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        number : Sequelize.INTEGER,
        description: Sequelize.STRING(255),
        tags: Sequelize.STRING,
        quantity: Sequelize.DOUBLE,
        price: Sequelize.DECIMAL,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: Sequelize.DATE,
        OrderId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: false,
          references: {
            model: 'Orders',
            key: 'id'
          }
        }
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('OrderDetails')
  }
}
