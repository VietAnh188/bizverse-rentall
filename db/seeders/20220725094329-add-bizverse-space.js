'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Listing',
      'bizverseSpaceData',
      {
          type: Sequelize.STRING,
          defaultValue: '[]'
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Listing', 'bizverseSpaceData');
  }
};
