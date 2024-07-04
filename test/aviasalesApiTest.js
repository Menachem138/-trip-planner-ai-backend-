const axios = require('axios');
require('dotenv').config();

const testAviasalesApi = async () => {
    const query = {
        origin: 'NYC',
        destination: 'LAX',
        depart_date: '2024-07-01',
        return_date: '2024-07-05',
        adults: 1
    };

    try {
        const response = await axios.get('http://localhost:5000/api/aviasales/prices_for_dates', {
            params: query
        });
        console.log('Aviasales API response:', response.data);
    } catch (error) {
        console.error('Error testing Aviasales API:', error);
    }
};

testAviasalesApi();
