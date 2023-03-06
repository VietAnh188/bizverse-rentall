'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Listing', 'isApproved', {
        type: Sequelize.BOOLEAN,
        defaultValue: null
      }),
      queryInterface.addColumn('Listing', 'isSubmit', {
        type: Sequelize.BOOLEAN,
        defaultValue: null
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Listing', 'isApproved'),
      queryInterface.removeColumn('Listing', 'isSubmit'),
    ])
  }
};
