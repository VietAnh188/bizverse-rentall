'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFT',
    'isOnMarketplace',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFT', 'isOnMarketplace');
  }
};
