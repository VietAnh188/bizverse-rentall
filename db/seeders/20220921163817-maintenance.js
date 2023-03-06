'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('Maintenance', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
          type: Sequelize.ENUM(['app', 'web', 'marketplace']),
          allowNull: false,
      },
      active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      startTime: {
          type: Sequelize.DATE,
      },
      endTime: {
          type: Sequelize.DATE,
      },
      description: {
          type: Sequelize.STRING,
          default: null   
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
    queryInterface.dropTable("Maintenance")
  }
};
