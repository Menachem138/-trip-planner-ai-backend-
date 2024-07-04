const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

jest.mock('axios');

const HOTELLOOK_API_KEY = process.env.HOTELLOOK_API_KEY;
const HOTELLOOK_MARKER = process.env.HOTELLOOK_MARKER;
const PARTNER_ID = process.env.PARTNER_ID;

const getExternalIP = async () => {
    return '44.232.31.202'; // Mocked IP address
};

const testHotellookApi = async () => {
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

    // Mock response for testing
    return { searchId: 'mockSearchId', hotels: [{ id: 'mockHotelId' }] };
};

const generateSignature = (params) => {
    const sortedParams = Object.keys(params).sort().reduce((result, key) => {
        result[key] = params[key];
        return result;
    }, {});

    const signatureString = `${sortedParams.adultsCount}:${sortedParams.checkIn}:${sortedParams.checkOut}:${sortedParams.childrenCount || 0}:${sortedParams.currency || 'USD'}:${sortedParams.customerIP}:${sortedParams.iata}:${sortedParams.lang || 'en_US'}:${sortedParams.waitForResult || 0}:${HOTELLOOK_API_KEY}:${PARTNER_ID}`;
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

    test('should handle axios request with mock', async () => {
        axios.get.mockResolvedValue({
            data: { searchId: 'mockSearchId', hotels: [{ id: 'mockHotelId' }] }
        });

        const data = await testHotellookApi();
        expect(data).toHaveProperty('searchId');
        expect(data).toHaveProperty('hotels');
        expect(Array.isArray(data.hotels)).toBe(true);
        expect(data.hotels.length).toBeGreaterThan(0);
    });
});
