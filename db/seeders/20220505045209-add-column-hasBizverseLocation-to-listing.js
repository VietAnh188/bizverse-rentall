'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.addColumn('Listing',
      'hasBizverseLocation',
      {
          type: Sequelize.STRING,
          defaultValue: "0"
      })

      await queryInterface.addColumn('Listing',
      'vr360Data',
      {
          type: Sequelize.STRING,
          defaultValue: []
      })
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
