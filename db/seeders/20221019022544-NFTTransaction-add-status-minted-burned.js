'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('NFTTransaction',
    'status',
    {
        type: Sequelize.ENUM('created', 'closed', 'cancelled', 'replaced', 'transferred', 'minted', 'burned'),
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('NFTTransaction',
    'status',
    {
        type: Sequelize.ENUM('created', 'closed', 'cancelled', 'replaced', 'transferred')
    })
  }
};
