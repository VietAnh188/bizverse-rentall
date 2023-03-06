'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Minting", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        nftId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        uri: {
          type: Sequelize.STRING
        },
        signedMessage: {
          type: Sequelize.STRING
        },
        mintingNonce: {
          type: Sequelize.INTEGER
        },
        delegatee: {
          type: Sequelize.STRING
        },
        recipient: {
          type: Sequelize.STRING
        },
        mut: {
          type: Sequelize.BOOLEAN
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Minting")
  }
};
