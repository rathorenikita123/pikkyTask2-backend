const express = require('express');
const { getFlights, createFlight, updateFlight } = require('../controllers/flight');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getFlights);
router.post('/', authenticate, createFlight);
router.patch('/:id', authenticate, updateFlight);

module.exports = router;
