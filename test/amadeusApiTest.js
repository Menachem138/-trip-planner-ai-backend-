require('dotenv').config();
const { searchHotels } = require('../utils/amadeusApi');

const testAmadeusApi = async () => {
    const query = {
        cityCode: 'NYC',
        checkInDate: '2024-07-01',
        checkOutDate: '2024-07-05',
        roomQuantity: 1,
        adults: 2
    };

    try {
        const response = await searchHotels(query);
        console.log('Search Hotels Response:', response);
    } catch (error) {
        console.error('Error testing Amadeus API:', error);
    }
};

testAmadeusApi();
