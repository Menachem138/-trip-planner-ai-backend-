const axios = require('axios');

const AVIASALES_API_KEY = process.env.AVIASALES_API_KEY;

const aviasalesApi = axios.create({
    baseURL: 'https://api.travelpayouts.com/v1/',
    headers: {
        'Authorization': `Bearer ${AVIASALES_API_KEY}`
    }
});

const searchFlights = async (query) => {
    try {
        const response = await aviasalesApi.get('flights', {
            params: query
        });
        return response.data;
    } catch (error) {
        console.error('Error searching flights:', error);
        throw error;
    }
};

module.exports = {
    searchFlights
};
