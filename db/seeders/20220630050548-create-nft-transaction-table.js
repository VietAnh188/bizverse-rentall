'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('NFTTransaction', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
      
        transactionId: {
          type: Sequelize.STRING,
          allowNull: false
        },
        
        nftId: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },

        status: { 
            type: Sequelize.ENUM('created', 'closed', 'cancelled', 'replaced'),
            allowNull: false
        },

        seller: {
          type: Sequelize.STRING,
          allowNull: false
        },

        price: {
          type: Sequelize.FLOAT,
        },

        hash: {
          type: Sequelize.STRING
        },
        currency: {
          type: Sequelize.STRING
        },

        transactionCreatedAt: {
          type: Sequelize.STRING
        },

        buyer: {
          type: Sequelize.STRING
        },

        blockNumber: {
          type: Sequelize.STRING
        },

        blockTimestamp: {
          type: Sequelize.STRING
        },

        seller: {
          type: Sequelize.STRING,
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
    queryInterface.dropTable('NFTTransaction');
  }
};
