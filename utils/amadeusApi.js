const axios = require('axios');

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;

const amadeusApi = axios.create({
    baseURL: 'https://test.api.amadeus.com/v1/',
    headers: {
        'Authorization': `Bearer ${AMADEUS_API_KEY}`
    }
});

const searchHotels = async (query) => {
    try {
        const response = await amadeusApi.get('shopping/hotel-offers', {
            params: query
        });
        return response.data;
    } catch (error) {
        console.error('Error searching hotels:', error);
        throw error;
    }
};

module.exports = {
    searchHotels
};
