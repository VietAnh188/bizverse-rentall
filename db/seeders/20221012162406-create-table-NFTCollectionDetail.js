'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("NFTCollectionDetail", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        collectionId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        nftId: {
          type: Sequelize.INTEGER,
          allowNull: false
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
    await queryInterface.dropTable("NFTCollectionDetail")
  }
};
