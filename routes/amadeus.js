const express = require('express');
const router = express.Router();
const { searchHotels } = require('../utils/amadeusApi');

// Route to search for hotels using Amadeus API
router.get('/hotels', async (req, res) => {
    try {
        const query = req.query;
        const hotels = await searchHotels(query);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search hotels' });
    }
});

module.exports = router;
