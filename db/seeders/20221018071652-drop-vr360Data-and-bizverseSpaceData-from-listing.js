'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('vr360Data', 'bizverseSpaceData');
  },

  async down (queryInterface, Sequelize) {
  }
};
