'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BlockNumber', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      blockNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      createdAt: {
        type: Sequelize.DATE
      },

      updatedAt: {
        type: Sequelize.DATE
      }
    });

    queryInterface.bulkInsert('BlockNumber', [
      {
        id: 1,
        blockNumber: 0,
        createdAt: '2017-04-18 20:13:25',
        updatedAt: '2017-04-18 20:13:25'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('BlockNumber');
  }
};
