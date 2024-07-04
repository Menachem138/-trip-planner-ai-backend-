const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const HOTELLOOK_API_KEY = process.env.HOTELLOOK_API_KEY;
const HOTELLOOK_MARKER = process.env.HOTELLOOK_MARKER;
const PARTNER_ID = process.env.PARTNER_ID;

const getExternalIP = async () => {
    try {
        console.log('Fetching external IP...');
        const response = await axios.get('https://api.ipify.org?format=json');
        console.log('External IP fetched:', response.data.ip);
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching external IP:', error.message);
        throw error;
    }
};

const testHotellookApi = async () => {
    console.log('Starting testHotellookApi...');
    const customerIP = await getExternalIP();
    const query = {
        adultsCount: 2,
        checkIn: '2024-07-01',
        checkOut: '2024-07-05',
        customerIP: customerIP,
        iata: 'NYC',
        lang: 'en_US',
        waitForResult: 0
    };

    try {
        console.log('Request query:', query);
        console.log('Request marker:', HOTELLOOK_MARKER);
        console.log('Request partner_id:', PARTNER_ID);
        console.log('Request signature:', generateSignature(query));
        const response = await axios.get('https://engine.hotellook.com/api/v2/search/start.json', {
            params: {
                ...query,
                marker: HOTELLOOK_MARKER,
                partner_id: PARTNER_ID,
                signature: generateSignature(query)
            },
            headers: {
                'X-Access-Token': HOTELLOOK_API_KEY
            }
        });
        console.log('Hotellook API response:', response.data);
        console.log('Hotellook API status:', response.status);
        console.log('Hotellook API headers:', response.headers);
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

const generateSignature = (params) => {
    const signatureString = `${HOTELLOOK_API_KEY}:${HOTELLOOK_MARKER}:${params.adultsCount}:${params.checkIn}:${params.checkOut}:${params.childAge1 || ''}:${params.childrenCount || 0}:${params.currency || 'USD'}:${params.customerIP}:${params.iata}:${params.lang || 'en_US'}:${params.waitForResult || 0}`;
    return crypto.createHash('md5').update(signatureString).digest('hex');
};

describe('Hotellook API', () => {
    test('should return hotel data', async () => {
        console.log('Running Hotellook API test...');
        const data = await testHotellookApi();
        console.log('Test data received:', data);
        expect(data).toHaveProperty('searchId');
        expect(data).toHaveProperty('hotels');
        expect(Array.isArray(data.hotels)).toBe(true);
        expect(data.hotels.length).toBeGreaterThan(0);
    });
});
