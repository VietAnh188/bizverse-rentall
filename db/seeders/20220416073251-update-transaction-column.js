'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Transaction',
        'paymentMethodDetailId',
        {
            type: Sequelize.INTEGER, 
            defaultValue: 2
        }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Transaction', 'paymentMethodDetailId')
  }
};
