'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BlockNumber',
    'typeId',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('BlockNumber', 'typeId');
  }
};
