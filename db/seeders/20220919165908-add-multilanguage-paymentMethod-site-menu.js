'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MultiLanguage", [
      {
        "type": "houseType",
        "typeId": 5,
        "language": "vi",
        "translation": "Nhà"
      },
      {
        "type": "cancellation.policyName",
        "typeId": 1,
        "language": "vi",
        "translation": "Linh hoạt"
      },
      {
        "type": "cancellation.policyName",
        "typeId": 2,
        "language": "vi",
        "translation": "Vừa phải"
      },
      {
        "type": "cancellation.policyName",
        "typeId": 3,
        "language": "vi",
        "translation": "Nghiêm ngặt"
      },
      {
        "type": "cancellation.content",
        "typeId": 1,
        "language": "vi",
        "translation": "Hủy tối đa 1 ngày trước khi đến và được hoàn tiền 100%"
      },
      {
        "type": "cancellation.content",
        "typeId": 2,
        "language": "vi",
        "translation": "Hủy tối đa 5 ngày trước khi đến và được hoàn lại 50%"
      },
      {
        "type": "cancellation.content",
        "typeId": 3,
        "language": "vi",
        "translation": "Hủy tối đa 7 ngày trước khi đến và được hoàn lại 50%"
      },
      {
        "type": "paymentmethods.processedIn",
        "typeId": 1,
        "language": "vi",
        "translation": "3–4 giờ"
      },
      {
        "type": "paymentmethods.processedIn",
        "typeId": 2,
        "language": "vi",
        "translation": "5–7 ngày làm việc"
      },
      {
        "type": "paymentmethods.processedIn",
        "typeId": 3,
        "language": "vi",
        "translation": "5-10 giây"
      },
      {
        "type": "paymentmethods.processedIn",
        "typeId": 4,
        "language": "vi",
        "translation": "0 giây"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
