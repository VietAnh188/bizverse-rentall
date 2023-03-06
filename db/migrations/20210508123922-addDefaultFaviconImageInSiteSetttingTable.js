'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [{
      title: 'Favicon Logo',
      name: 'faviconLogo',
      value: '3b8e5dee4415efd0663e848509e87560.png',
      type: 'site_settings',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SiteSettings', {
      name: {
        $in: ['faviconLogo']
      }
    })
  }
};
