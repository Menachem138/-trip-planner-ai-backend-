const { searchHotels } = require('./utils/bookingApi');

const testBookingApi = async () => {
    const query = {
        destination: 'New York',
        checkin_date: '2024-07-01',
        checkout_date: '2024-07-05',
        adults: 2,
        children: 0,
        rooms: 1
    };

    try {
        const response = await searchHotels(query);
        console.log('Search Hotels Response:', response);
    } catch (error) {
        console.error('Error testing Booking.com API:', error);
    }
};

testBookingApi();
