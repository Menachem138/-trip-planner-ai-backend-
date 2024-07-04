const express = require('express');
const router = express.Router();
const { searchFlights } = require('../utils/aviasalesApi');

// Route to search for flights using Aviasales API
router.get('/flights', async (req, res) => {
    try {
        const query = req.query;
        const flights = await searchFlights(query);
        if (flights.data.length === 0) {
            res.json({ message: 'No flights found for the given search criteria.' });
        } else {
            res.json(flights);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to search flights' });
    }
});

module.exports = router;
