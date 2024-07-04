const express = require('express');
const router = express.Router();
const { searchHotels } = require('../utils/hotellookApi');

// Route to search for hotels using Hotellook API
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
