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
        return response.data;
    } catch (error) {
        console.error('Error testing Aviasales API:', error);
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
