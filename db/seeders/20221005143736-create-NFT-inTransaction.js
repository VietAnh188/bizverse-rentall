'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFT',
    'inTransaction',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: '0'
    })

    await queryInterface.addColumn('NFT',
    'inTransactionAt',
    {
        type: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFT', 'inTransaction');
    await queryInterface.removeColumn('NFT', 'inTransactionAt');
  }
};
