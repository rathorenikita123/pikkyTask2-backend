const { updateFlightStatuses } = require('../services/flight');

// Set interval to update statuses every 10 minutes
setInterval(() => {
  updateFlightStatuses().then(() => {
    console.log('Flight statuses updated');
  });
}, 600000); // 10 minutes
