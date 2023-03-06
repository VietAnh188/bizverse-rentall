'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFT',
    'uri',
    {
        type: Sequelize.STRING,
        default: Sequelize.NULL
    });

    await queryInterface.addColumn('Reservation',
    'payoutState',
    {
        type: Sequelize.STRING,
        default: Sequelize.NULL
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFT', 'uri');
    await queryInterface.removeColumn('Reservation', 'payoutState');
  }
};
