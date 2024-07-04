const axios = require('axios');
const crypto = require('crypto');

const HOTELLOOK_API_KEY = process.env.HOTELLOOK_API_KEY;
const HOTELLOOK_MARKER = process.env.HOTELLOOK_MARKER;
const PARTNER_ID = process.env.PARTNER_ID;

const hotellookApi = axios.create({
    baseURL: 'https://engine.hotellook.com/api/v2/',
});

const generateSignature = (params) => {
    const signatureString = `${HOTELLOOK_API_KEY}:${HOTELLOOK_MARKER}:${params.adultsCount}:${params.checkIn}:${params.checkOut}:${params.childAge1 || ''}:${params.childrenCount || 0}:${params.currency || 'USD'}:${params.customerIP}:${params.iata}:${params.lang || 'en_US'}:${params.waitForResult || 0}`;
    return crypto.createHash('md5').update(signatureString).digest('hex');
};

const searchHotels = async (query) => {
    try {
        const params = {
            ...query,
            marker: HOTELLOOK_MARKER,
            partner_id: PARTNER_ID,
            signature: generateSignature(query)
        };
        const response = await hotellookApi.get('search/start.json', {
            params
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
