'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MultiLanguage", [
      {
        "type": "spaces",
        "typeId": 35,
        "language": "vi",
        "translation": "Máy sấy quần áo"
      }
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
