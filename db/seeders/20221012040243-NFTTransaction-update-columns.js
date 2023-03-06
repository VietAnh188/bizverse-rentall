'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('NFTTransaction', 'seller', 'from');
    await queryInterface.renameColumn('NFTTransaction', 'buyer', 'to');
    await queryInterface.addColumn(
      'NFTTransaction',
      'transactionType',
      Sequelize.ENUM('offer', 'transfer')
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('NFTTransaction', 'from', 'seller');
    await queryInterface.renameColumn('NFTTransaction', 'to', 'buyer');
    await queryInterface.removeColumn('NFTTransaction', 'transactionType');
  }
};
