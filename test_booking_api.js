require('dotenv').config(); // Add this line to load environment variables

const { searchHotels } = require('./utils/bookingApi');

const testBookingApi = async () => {
    const query = {
        destination: 'New York',
        checkin_date: '2024-07-01',
        checkout_date: '2024-07-05',
        adults: 2,
        children: 0,
        rooms: 1,
        country: 'US', // Added country field
        platform: 'web', // Added platform field
        accommodation: 10004 // Added accommodation field with a placeholder value
    };

    try {
        const response = await searchHotels(query);
        console.log('Search Hotels Response:', response);
    } catch (error) {
        console.error('Error testing Booking.com API:', error);
    }
};

testBookingApi();
