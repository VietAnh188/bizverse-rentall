'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFT',
    'originalOwner',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFT', 'originalOwner');
  }
};
