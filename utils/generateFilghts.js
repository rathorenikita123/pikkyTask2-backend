const { generateRandomFlights } = require('../services/flight');

// Call this function once to populate the database
generateRandomFlights().then(() => {
  console.log('Random flights generated');
  process.exit();
});
