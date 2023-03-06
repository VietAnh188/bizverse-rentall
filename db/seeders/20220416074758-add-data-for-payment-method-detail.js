'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('PaymentMethodDetail',[
        {
            id: 1,
            paymentId: 3,
            methodName: 'OneFin E-wallet', 
            paymentDetailType: 11
        },
        {
            id: 2,
            paymentId: 3,
            methodName: 'ATM card (Napas)', 
            paymentDetailType: 10
        },
        {
            id: 3,
            paymentId: 3,
            methodName: 'Visa/Master/JCD/Amex/Discover/Diners', 
            paymentDetailType: 5
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.sequelize.query("DELETE FROM `trinh_rentall_2022`.`PaymentMethodDetail` WHERE (`id` = 1);",queryInterface.sequelize.QueryTypes.DELETE)
     queryInterface.sequelize.query("DELETE FROM `trinh_rentall_2022`.`PaymentMethodDetail` WHERE (`id` = 2);",queryInterface.sequelize.QueryTypes.DELETE)
     queryInterface.sequelize.query("DELETE FROM `trinh_rentall_2022`.`PaymentMethodDetail` WHERE (`id` = 3);",queryInterface.sequelize.QueryTypes.DELETE)
  }
};
