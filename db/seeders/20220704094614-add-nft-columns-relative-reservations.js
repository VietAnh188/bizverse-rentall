'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFT',
    'reservationId',
    {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.NULL
    })

    await queryInterface.addColumn('NFT',
    'requestUser',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })

    await queryInterface.addColumn('NFT',
    'isSent',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: Sequelize.NULL
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFT', 'reservationId');
    await queryInterface.removeColumn('NFT', 'requestUser');
    await queryInterface.removeColumn('NFT', 'isSent');
  }
};
