'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SideMenu', [{
        title: 'Block1',
        description: 'Block content',
        name: 'block1',
        page: null,
        step: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('SideMenu', [{
        title: 'Block2',
        description: 'Block content',
        name: 'block2',
        page: null,
        step: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('SideMenu', [{
        title: 'Block3',
        description: 'Block content',
        name: 'block3',
        page: null,
        step: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SideMenu', {
      name: {
        $in: ['block1', 'block2', 'block3']
      }
    })
  }
};
