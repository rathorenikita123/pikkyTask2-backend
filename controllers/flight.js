const Flight = require('../models/Flight');

exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFlight = async (req, res) => {
  const flight = new Flight(req.body);
  try {
    const newFlight = await flight.save();
    const io = req.app.get('socketio');
    io.emit('newFlight', newFlight);
    res.status(201).json(newFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    Object.assign(flight, req.body);
    await flight.save();

    const io = req.app.get('socketio');
    io.emit('updateFlight', flight);

    res.json(flight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
