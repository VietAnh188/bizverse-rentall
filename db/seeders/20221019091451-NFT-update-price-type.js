'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('NFT',
    'lastPrice',
    {
        type: Sequelize.FLOAT,
    })

    await queryInterface.changeColumn('NFT',
    'currentPrice',
    {
        type: Sequelize.FLOAT,
    })

    await queryInterface.changeColumn('NFT',
    'mintingPrice',
    {
        type: Sequelize.FLOAT,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
