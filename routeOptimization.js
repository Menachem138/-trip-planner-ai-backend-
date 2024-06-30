const axios = require('axios');

// Function to optimize route using GraphHopper API
async function optimizeRoute(tripDetails) {
    const apiKey = 'YOUR_GRAPHHOPPER_API_KEY'; // Replace with your GraphHopper API key
    const url = 'https://graphhopper.com/api/1/route';

    const params = {
        key: apiKey,
        vehicle: 'car',
        locale: 'en',
        points: tripDetails.points, // Array of [latitude, longitude] pairs
        optimize: true
    };

    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error('Error optimizing route:', error);
        throw error;
    }
}

module.exports = {
    optimizeRoute
};
