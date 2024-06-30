const express = require('express');
const router = express.Router();
const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

router.post('/optimize', async (req, res) => {
    const { origin, destination, waypoints } = req.body;

    try {
        const response = await client.directions({
            params: {
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                key: process.env.GOOGLE_MAPS_API_KEY
            },
            timeout: 1000 // milliseconds
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching directions:', error);
        res.status(500).json({ message: 'Error fetching directions' });
    }
});

module.exports = router;
