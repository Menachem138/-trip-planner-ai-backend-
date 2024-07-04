const axios = require('axios');

const AVIASALES_API_KEY = process.env.open_ai_open_ai;

const aviasalesApi = axios.create({
    baseURL: 'https://api.travelpayouts.com/aviasales/v3/',
    headers: {
        'X-Access-Token': AVIASALES_API_KEY
    }
});

const searchFlights = async (query) => {
    try {
        const response = await aviasalesApi.get('prices_for_dates', {
            params: query
        });
        console.log('Aviasales API response:', response.data); // Added logging
        return response.data;
    } catch (error) {
        console.error('Error searching flights:', error);
        throw error;
    }
};

module.exports = {
    searchFlights
};
