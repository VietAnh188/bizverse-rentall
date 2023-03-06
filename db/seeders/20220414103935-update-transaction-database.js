'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn( 
        'Transaction',
        'status', 
        Sequelize.ENUM('APPROVED', 'OPENED', 'DECLINED', 'SETTLED', 'CANCELLED', 'VOIDED')
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'Transaction',
        'status'
      );
  }
};
