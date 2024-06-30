const express = require('express');
const router = express.Router();
const axios = require('axios');

const EXPEDIA_API_KEY = process.env.EXPEDIA_API_KEY;
const EXPEDIA_SHARED_SECRET = process.env.EXPEDIA_SHARED_SECRET;

router.get('/travel', async (req, res) => {
    try {
        const response = await axios.get('https://api.expedia.com/travel', {
            headers: {
                'Authorization': `Bearer ${EXPEDIA_API_KEY}`,
                'X-Shared-Secret': EXPEDIA_SHARED_SECRET
            }
        });

        const travelData = response.data;
        res.json(travelData);
    } catch (error) {
        console.error('Error fetching travel data:', error);
        res.status(500).json({ message: 'Error fetching travel data' });
    }
});

module.exports = router;
