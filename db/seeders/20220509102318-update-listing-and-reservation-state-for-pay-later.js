'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Listing',
    'isPayLater',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: "0"
    })

    await queryInterface.sequelize.query("Insert into `trinh_rentall_2022`.`PaymentMethods` (id, name, processedIn, fees, currency, details, isEnable,createdAt, updatedAt,paymenttype)  values (4, 'Pay Later','0 seconds','No fees','VND', 'Payment when you check in',true,'2017-04-18 20:13:25','2017-04-18 20:13:25',4)", queryInterface.sequelize.QueryTypes.INSERT)

    await queryInterface.addColumn('Reservation',
    'isPayLater',
    {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    })
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Listing', 'isPayLater');
    await queryInterface.sequelize.query("DELETE FROM `trinh_rentall_2022`.`PaymentMethods` WHERE (`id` = '4');     ",queryInterface.sequelize.QueryTypes.DELETE)
    await queryInterface.removeColumn('Reservation', 'isPayLater');
  }
};
