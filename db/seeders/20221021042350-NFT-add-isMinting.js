'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('NFT', 'isMinting', {
          type: Sequelize.BOOLEAN,
          defaultValue: 0
        });

        await queryInterface.addColumn('NFT', 'mintedAt', {
          type: Sequelize.DATE
        });
      },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('NFT', 'isMinting');
        await queryInterface.removeColumn('NFT', 'mintedAt');
    }
};
