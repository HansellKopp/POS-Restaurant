'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('Users', [
        { username: 'super@pos.com', user_type: 'superuser', email: 'super@pos.com', password: 'super', createdAt: new Date(), updatedAt: new Date() },
        { username: 'admin@pos.com', user_type: 'admin', email: 'admin@pos.com', password: 'admin', createdAt: new Date(), updatedAt: new Date()},
        { username: 'user@pos.com', user_type: 'user', email: 'user@pos.com', password: 'user', createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', null, {});
  }
};