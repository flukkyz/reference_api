'use strict';
const nationalities = require('./references/nationalities');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('nationalities', nationalities);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('nationalities', null);
  }
};