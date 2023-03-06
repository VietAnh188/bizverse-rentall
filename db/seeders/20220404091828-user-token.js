'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        queryInterface.createTable('UserToken', {
           id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement: true
             },
           
             userId: {
               type: Sequelize.UUID,
               defaultValue: Sequelize.UUIDV1,
               allowNull: false
             },
           
             accessToken: {
               type: Sequelize.STRING,
               allowNull: false
             },
           
             tokenSavedAt: {
               type: Sequelize.DATE,
               allowNull: false
             },

             createdAt: {
               type: Sequelize.DATE,
             },

             updatedAt: {
               type: Sequelize.DATE,
             },

             email: {
               type: Sequelize.STRING(255),
               validate: { isEmail: true },
               allowNull: false
             }
         })
     },
   
     async down (queryInterface, Sequelize) {
        queryInterface.dropTable('UserToken')
     }
};
