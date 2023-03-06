'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reservation',
    'isPayout',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: "0"
    })
    await queryInterface.removeColumn('Reservation', 'payoutState');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Reservation', 'isPayout');
  }
};
