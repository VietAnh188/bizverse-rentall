'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MultiLanguage", 
    [
      {
        "type": "sideMenu.title",
        "typeId": 1,
        "language": "vi",
        "translation": "Linh hoạt"
      },
      {
        "type": "sideMenu.title",
        "typeId": 2,
        "language": "vi",
        "translation": "Vừa phải"
      },
      {
        "type": "sideMenu.title",
        "typeId": 3,
        "language": "vi",
        "translation": "Nghiêm ngặt"
      },
      {
        "type": "sideMenu.description",
        "typeId": 1,
        "language": "vi",
        "translation": "Hủy tối đa 1 ngày trước khi đến và được hoàn tiền 100%"
      },
      {
        "type": "sideMenu.description",
        "typeId": 2,
        "language": "vi",
        "translation": "Hủy tối đa 5 ngày trước khi đến và được hoàn lại 50%"
      },
      {
        "type": "sideMenu.description",
        "typeId": 3,
        "language": "vi",
        "translation": "Hủy tối đa 7 ngày trước khi đến và được hoàn lại 50%"
      }
    ]
    )
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
