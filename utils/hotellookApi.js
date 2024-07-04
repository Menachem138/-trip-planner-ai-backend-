const axios = require('axios');

const HOTELLOOK_API_KEY = process.env.HOTELLOOK_API_KEY;

const hotellookApi = axios.create({
    baseURL: 'https://engine.hotellook.com/api/v2/',
    headers: {
        'Authorization': `Bearer ${HOTELLOOK_API_KEY}`
    }
});

const searchHotels = async (query) => {
    try {
        const response = await hotellookApi.get('search', {
            params: query
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
