'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentMethodDetail', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
        
          paymentId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            allowNull: false
          },
          
          methodName: { 
              type: Sequelize.STRING, 
              allowNull: false 
          },

          paymentDetailType: { 
              type: Sequelize.STRING, 
              allowNull: false
          }

      });

    await queryInterface.sequelize.query("Insert into `trinh_rentall_2022`.`PaymentMethods` (id, name, processedIn, fees, currency, details, isEnable,createdAt, updatedAt,paymenttype)  values (3, 'OneFin','5-10 seconds','5-10 seconds','VND', 'Add your OneFin account',true,'2017-04-18 20:13:25','2017-04-18 20:13:25',3)", queryInterface.sequelize.QueryTypes.INSERT)

  },

  async down (queryInterface, Sequelize) {
     queryInterface.dropTable('PaymentMethodDetail');
     queryInterface.sequelize.query("DELETE FROM `trinh_rentall_2022`.`PaymentMethods` WHERE (`id` = '3');     ",queryInterface.sequelize.QueryTypes.DELETE)
  }
};
