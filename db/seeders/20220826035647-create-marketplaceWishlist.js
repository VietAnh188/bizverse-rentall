'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('MarketplaceWishList', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    
      userId: {
        type: Sequelize.STRING
      },

      wallet: {
        type: Sequelize.STRING
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
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('MarketplaceWishList');
  }
};
