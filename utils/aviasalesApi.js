const axios = require('axios');

const AVIASALES_API_KEY = process.env.AVIASALES_API_KEY;
const PARTNER_ID = process.env.PARTNER_ID;

const aviasalesApi = axios.create({
    baseURL: 'https://api.travelpayouts.com/aviasales/v3/',
    headers: {
        'X-Access-Token': AVIASALES_API_KEY
    }
});

const searchFlights = async (query) => {
    try {
        const response = await aviasalesApi.get('prices_for_dates', {
            params: {
                origin: query.origin,
                destination: query.destination,
                departure_at: query.departure_at,
                return_at: query.return_at,
                one_way: query.one_way || false,
                direct: query.direct || false,
                currency: query.currency || 'USD',
                limit: query.limit || 30,
                page: query.page || 1,
                sorting: query.sorting || 'price',
                unique: query.unique || false,
                partner_id: PARTNER_ID
            }
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
