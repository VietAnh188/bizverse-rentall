'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Listing', 'bizverseLink');
    await queryInterface.addColumn('Listing',
    'bizverseLink360',
    {
        type: Sequelize.STRING,
        default: Sequelize.NULL
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Listing', 'bizverseLink360');
    await queryInterface.addColumn('Listing',
    'bizverseLink',
    {
        type: Sequelize.STRING,
        default: Sequelize.NULL
    })
  }
};
