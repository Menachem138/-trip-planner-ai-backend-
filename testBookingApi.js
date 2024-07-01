require('dotenv').config();
const axios = require('axios');

const BOOKING_API_KEY = process.env.BOOKING_API_KEY;

const testBookingApi = async () => {
    const requestBody = {
        accommodation: 10004,
        booker: {
            country: 'nl',
            platform: 'desktop'
        },
        checkin: '2024-07-01',
        checkout: '2024-07-05',
        extras: [
            'extra_charges'
        ],
        guests: {
            number_of_adults: 2,
            number_of_rooms: 1
        }
    };

    try {
        const response = await axios.post('https://api.booking.com/accommodations/availability', requestBody, {
            headers: {
                'Authorization': `Bearer ${BOOKING_API_KEY}`,
                'Content-Type': 'application/json',
                'X-Affiliate-Id': '0'
            }
        });
        console.log('Search Hotels Response:', response.data);
    } catch (error) {
        console.error('Error testing Booking.com API:', error.response ? error.response.data : error.message);
    }
};

testBookingApi();
