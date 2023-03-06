'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE Cancellation SET guestFeeBeforeCheckIn=0 WHERE id = 3')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE Cancellation SET guestFeeBeforeCheckIn=100 WHERE id = 3')
  }
};
