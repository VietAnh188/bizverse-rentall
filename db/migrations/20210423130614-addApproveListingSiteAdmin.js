'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [{
      title: 'Listing Approval',
      name: 'listingApproval',
      value: 'optional',
      type: 'site_settings',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SiteSettings', {
      name: {
        $in: ['listingApproval']
      }
    })
  }
};
