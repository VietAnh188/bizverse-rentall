'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("MultiLanguage", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false
        },
        typeId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        language: {
          type: Sequelize.STRING,
          allowNull: false
        },
        translation: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("MultiLanguage")
  }
};
