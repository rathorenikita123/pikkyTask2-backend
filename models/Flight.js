// import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const flightSchema = new Schema({
  flightNumber: String,
  origin: String,
  destination: String,
  scheduledDeparture: Date,
  status: {
    type: String,
    enum: ['Delayed', 'Cancelled', 'In-flight', 'Scheduled/En Route'],
    default: 'Scheduled/En Route',
  },
  airline: String,
  flightType: {
    type: String,
    enum: ['Commercial', 'Military', 'Private'],
  },
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
