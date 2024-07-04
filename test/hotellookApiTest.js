const axios = require('axios');
require('dotenv').config();

const testHotellookApi = async () => {
    const query = {
        location: 'New York',
        checkIn: '2024-07-01',
        checkOut: '2024-07-05',
        adults: 2
    };

    try {
        const response = await axios.get('http://localhost:5000/api/hotellook/hotels', {
            params: query
        });
        console.log('Hotellook API response:', response.data);
    } catch (error) {
        console.error('Error testing Hotellook API:', error);
    }
};

testHotellookApi();
