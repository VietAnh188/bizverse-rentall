'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ListPhotos',
      'isPanorama',
      {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ListPhotos', 'isPanorama');
  }
};
