'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('NFTCollection',
    'description',
    {
        type: Sequelize.TEXT,
    })

    await queryInterface.changeColumn('NFT',
    'detail',
    {
        type: Sequelize.TEXT,
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
