const express = require('express');
const router = express.Router();
const { searchHotels, getBookingDetails, manageReservation } = require('../utils/bookingApi');

// Route for searching hotels
router.get('/search', async (req, res) => {
    try {
        const results = await searchHotels(req.query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error searching hotels', error: error.message });
    }
});

// Route for retrieving booking details
router.get('/details/:id', async (req, res) => {
    try {
        const details = await getBookingDetails(req.params.id);
        res.json(details);
    } catch (error) {
        res.status(500).json({ message: 'Error getting booking details', error: error.message });
    }
});

// Route for managing reservations
router.post('/reserve', async (req, res) => {
    try {
        const reservation = await manageReservation(req.body);
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Error managing reservation', error: error.message });
    }
});

module.exports = router;
