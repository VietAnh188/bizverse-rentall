'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn('Listing',
    // 'bizverseLat',
    // {
    //     type: Sequelize.STRING,
    //     default: Sequelize.NULL
    // })

    // await queryInterface.addColumn('Listing',
    // 'bizverseLng',
    // {
    //     type: Sequelize.STRING,
    //     default: Sequelize.NULL
    // })

    // await queryInterface.addColumn('Listing',
    // 'bizverseLink',
    // {
    //     type: Sequelize.STRING,
    //     default: Sequelize.NULL
    // })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Payout', 'bizverseLat')
    await queryInterface.removeColumn('Payout', 'bizverseLng')
    await queryInterface.removeColumn('Payout', 'bizverseLink')
  }
};
