'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('NFT', 'isSent', 'claimWallet');
    await queryInterface.changeColumn('NFT',
    'claimWallet',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('NFT', 'claimWallet', 'isSent');
    await queryInterface.changeColumn('NFT',
    'claimWallet',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.NULL
    })
  }
};
