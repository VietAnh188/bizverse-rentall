'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("NFTCollection", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING
        },
        coverImage: {
          type: Sequelize.STRING
        },
        avatar: {
          type: Sequelize.STRING
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
    await queryInterface.dropTable("NFTCollection")
  }
};
