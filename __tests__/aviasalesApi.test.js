const axios = require('axios');
require('dotenv').config();

const AVIASALES_API_KEY = process.env.AVIASALES_API_KEY;

const testAviasalesApi = async () => {
    const query = {
        origin: 'NYC',
        destination: 'LAX',
        depart_date: '2024-07-01',
        return_date: '2024-07-05',
        adults: 1
    };

    try {
        const response = await axios.get('http://localhost:5000/api/aviasales/flights', {
            params: query,
            headers: {
                'X-Access-Token': AVIASALES_API_KEY
            }
        });
        console.log('Aviasales API response:', response.data);
        console.log('Aviasales API status:', response.status);
        console.log('Aviasales API headers:', response.headers);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

describe('Aviasales API', () => {
    test('should return flight data', async () => {
        const data = await testAviasalesApi();
        expect(data).toHaveProperty('flights');
        expect(Array.isArray(data.flights)).toBe(true);
        expect(data.flights.length).toBeGreaterThan(0);
    });
});
