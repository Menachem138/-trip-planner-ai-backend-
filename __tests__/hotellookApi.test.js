const axios = require('axios');
const crypto = require('crypto');
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
        const response = await axios.get('https://yasen.hotellook.com/api/v2/cache.json', {
            params: {
                ...query,
                marker: HOTELLOOK_MARKER,
                signature: generateSignature(query)
            },
            headers: {
                'X-Access-Token': HOTELLOOK_API_KEY
            }
        });
        console.log('Hotellook API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error testing Hotellook API:', error);
        throw error;
    }
};

const generateSignature = (params) => {
    const signatureString = `${HOTELLOOK_API_KEY}:${HOTELLOOK_MARKER}:${params.adultsCount}:${params.checkIn}:${params.checkOut}:${params.childAge1 || ''}:${params.childrenCount || 0}:${params.currency || 'USD'}:${params.customerIP}:${params.iata}:${params.lang || 'en_US'}:${params.waitForResult || 0}`;
    return crypto.createHash('md5').update(signatureString).digest('hex');
};

describe('Hotellook API', () => {
    test('should return hotel data', async () => {
        const data = await testHotellookApi();
        expect(data).toHaveProperty('searchId');
        expect(data).toHaveProperty('hotels');
        expect(Array.isArray(data.hotels)).toBe(true);
        expect(data.hotels.length).toBeGreaterThan(0);
    });
});
