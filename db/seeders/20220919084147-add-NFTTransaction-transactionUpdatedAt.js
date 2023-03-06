'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFTTransaction',
    'transactionUpdatedAt',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFTTransaction', 'transactionUpdatedAt');
  }
};
