'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("Update SiteSettings set value = '0' WHERE name = 'listingApproval';"),
      queryInterface.removeColumn('Listing', 'isSubmit'),
      queryInterface.removeColumn('Listing', 'isApproved'),
      queryInterface.addColumn('Listing', 'listApprovalStatus', {
        type: Sequelize.STRING,
        defaultValue: null
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
    ])
  }
};
