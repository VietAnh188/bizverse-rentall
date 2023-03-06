'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFTTransaction',
    'offerId',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })

    await queryInterface.addColumn('NFTTransaction',
    'transferId',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFTTransaction', 'offerId');
    await queryInterface.removeColumn('NFTTransaction', 'transferId');
  }
};
