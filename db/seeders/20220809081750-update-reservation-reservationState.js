'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Reservation',
    'reservationState',
    {
        type: Sequelize.ENUM('pending', 'expired', 'approved', 'declined', 'completed', 'cancelled', 'draft', 'blocked', 'nft'),
        defaultValue: 'pending',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Reservation',
    'reservationState',
    {
        type: Sequelize.ENUM('pending', 'expired', 'approved', 'declined', 'completed', 'cancelled', 'draft', 'nft'),
        defaultValue: 'pending',
    })
  }
};
