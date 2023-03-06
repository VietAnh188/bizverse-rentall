'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFT',
    'currency',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFT', 'currency');
  }
};
