const Flight = require('../models/Flight');

exports.generateRandomFlights = async () => {
  const airlines = ['Airline A', 'Airline B', 'Airline C'];
  const flightTypes = ['Commercial', 'Military', 'Private'];
  const statuses = ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route'];
  const origins = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const destinations = ['Miami', 'Atlanta', 'Dallas', 'Denver', 'Seattle'];

  for (let i = 0; i < 400; i++) {
    const flight = new Flight({
      flightNumber: `FL${Math.floor(Math.random() * 10000)}`,
      origin: origins[Math.floor(Math.random() * origins.length)],
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      scheduledDeparture: new Date(Date.now() + Math.floor(Math.random() * 100000000)),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      flightType: flightTypes[Math.floor(Math.random() * flightTypes.length)],
    });
    await flight.save();
  }
};

exports.updateFlightStatuses = async () => {
  const flights = await Flight.find();
  flights.forEach(async (flight) => {
    const statusOptions = ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route'];
    flight.status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    await flight.save();

    const io = req.app.get('socketio');
    io.emit('updateFlight', flight);
  });
};
