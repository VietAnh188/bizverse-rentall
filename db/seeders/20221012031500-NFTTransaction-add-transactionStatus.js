'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'NFTTransaction',
      'transactionStatus',
      Sequelize.ENUM('pending', 'success', 'fail')
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFTTransaction', 'transactionStatus');
  }
};
