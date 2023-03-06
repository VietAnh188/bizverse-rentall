'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ListingSnapshot', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

          originalListingId: {
            type: Sequelize.STRING,
            allowNull: false
          },

          userId: {
            type: Sequelize.STRING
          },
        
          title: {
            type: Sequelize.STRING,
          },
        
          description: {
            type: Sequelize.TEXT,
          },

          bedType: {
            type: Sequelize.STRING
          },

          roomType: { 
            type: Sequelize.STRING
          },

          houseType: { 
            type: Sequelize.STRING
          },
        
          residenceType: {
            type: Sequelize.STRING,
          },
        
          bedrooms: {
            type: Sequelize.STRING,
          },
        
          beds: {
            type: Sequelize.INTEGER,
          },
        
          personCapacity: {
            type: Sequelize.INTEGER,
          },
        
          bathrooms: {
            type: Sequelize.FLOAT,
          },

          pathrooms: {
            type: Sequelize.INTEGER,
          },
        
          country: {
            type: Sequelize.STRING,
          },
        
          street: {
            type: Sequelize.STRING,
          },
        
          buildingName: {
            type: Sequelize.STRING,
          },

          buildingSize: {
            type: Sequelize.FLOAT
          },
        
          city: {
            type: Sequelize.STRING,
          },
        
          state: {
            type: Sequelize.STRING,
          },
        
          zipcode: {
            type: Sequelize.STRING,
          },
        
          lat: {
            type: Sequelize.FLOAT,
          },
        
          lng: {
            type: Sequelize.FLOAT,
          },
        
          coverPhoto: {
            type: Sequelize.INTEGER,
          },
        
          isMapTouched: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
        
          bookingType: {
            type: Sequelize.ENUM('request', 'instant'),
            defaultValue: 'instant',
            allowNull: false
          },
        
          isPublished: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          },
        
          isReady: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
          },
        
          reviewsCount: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
          },
        
          listApprovalStatus: {
            type: Sequelize.STRING,
            defaultValue: null,
          },
        
          bizverseLat: { 
              type: Sequelize.STRING,
              defaultValue: null,
          },
        
          bizverseLng: { 
              type: Sequelize.STRING,
              defaultValue: null,
          },
        
          bizverseLink360: {
              type: Sequelize.STRING,
              defaultValue:  null,
          },   
        
          hasBizverseLocation: {
            type: Sequelize.STRING,
          },
        
          vr360Data: {
            type: Sequelize.STRING
          },
        
          bizverseSpaceData: {
            type: Sequelize.STRING
          },
        
          isPayLater: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
          },
          
          customRule: {
            type: Sequelize.STRING,
            defaultValue: ''
          },

          createdAt: {
            type: Sequelize.DATE,
          },

          updatedAt: {
            type: Sequelize.DATE,
          }
      });

  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('NFTTransaction');
  }
};
