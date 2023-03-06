'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BlockNumber',
    'type',
    {
        type: Sequelize.STRING,
        defaultValue: 'transfer'
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('BlockNumber', 'type')
  }
};
