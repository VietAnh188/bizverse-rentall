'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('QRCode', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
        
          nftId: {
            type:Sequelize.INTEGER
          },

          userId: {
            type: Sequelize.UUID,
          },
          
          owner: { 
              type: Sequelize.STRING
          },

          code: { 
              type: Sequelize.STRING,
              allowNull: false
          },

          isAvailable: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
          },
          
          createdAt: {
            type: Sequelize.DATE
          },
    
          updatedAt: {
            type: Sequelize.DATE
          }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('QRCode')
  }
};
