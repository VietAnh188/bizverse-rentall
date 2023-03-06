'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('NFT',
    'isSelling',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: "0"
    })

    await queryInterface.addColumn('NFT',
    'canBooking',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: "0"
    })

    await queryInterface.addColumn('NFT',
    'nftState',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })
    
    await queryInterface.addColumn('NFT',
    'owner',
    {
        type: Sequelize.STRING,
        defaultValue: Sequelize.NULL
    })

    await queryInterface.addColumn('NFT',
    'mintingPrice',
    {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.NULL
    })

    await queryInterface.addColumn('NFT',
    'lastPrice',
    {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.NULL
    })

    await queryInterface.addColumn('NFT',
    'currentPrice',
    {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.NULL
    })

    await queryInterface.addColumn('NFT',
    'isDeleted',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: "0"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NFT', 'owner');
    await queryInterface.removeColumn('NFT', 'mintingPrice');
    await queryInterface.removeColumn('NFT', 'lastPrice');
    await queryInterface.removeColumn('NFT', 'currentPrice');
    await queryInterface.removeColumn('NFT', 'canBooking');
    await queryInterface.removeColumn('NFT', 'nftState');
    await queryInterface.removeColumn('NFT', 'isSelling');
    await queryInterface.removeColumn('NFT', 'isDeleted');
  }
};
