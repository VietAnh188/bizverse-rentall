'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.addColumn('NFT', 'isTrending', {
          type: Sequelize.BOOLEAN,
          defaultValue: 0
        });
      },
    down: async (queryInterface, Sequelize) => {
        return await queryInterface.removeColumn('NFT', 'isTrending');
    }
};
