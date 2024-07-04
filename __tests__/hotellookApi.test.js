const axios = require('axios');
require('dotenv').config();

const HOTELLOOK_API_KEY = process.env.HOTELLOOK_API_KEY;
const HOTELLOOK_MARKER = process.env.HOTELLOOK_MARKER;

const testHotellookApi = async () => {
    const query = {
        adultsCount: 2,
        checkIn: '2024-07-01',
        checkOut: '2024-07-05',
        customerIP: '127.0.0.1',
        iata: 'NYC',
        lang: 'en_US',
        waitForResult: 0
    };

    try {
        const response = await axios.get('http://localhost:5000/api/hotellook/search', {
            params: query,
            headers: {
                'X-Access-Token': HOTELLOOK_API_KEY
            }
        });
        console.log('Hotellook API response:', response.data);
    } catch (error) {
        console.error('Error testing Hotellook API:', error);
    }
};

describe('Hotellook API', () => {
    test('should return hotel data', async () => {
        await testHotellookApi();
    });
});
