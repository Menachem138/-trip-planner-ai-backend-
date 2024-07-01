const axios = require('axios');

const BOOKING_API_KEY = process.env.BOOKING_API_KEY;

console.log('BOOKING_API_KEY:', BOOKING_API_KEY); // Log the BOOKING_API_KEY to verify it's set correctly

const bookingApi = axios.create({
    baseURL: 'https://api.booking.com',
    headers: {
        'Authorization': `Bearer ${BOOKING_API_KEY}`
    }
});

const searchHotels = async (query) => {
    try {
        const requestBody = {
            booker: {
                country: query.country,
                platform: query.platform
            },
            checkin: query.checkin_date,
            checkout: query.checkout_date,
            guests: {
                number_of_adults: query.adults,
                number_of_rooms: query.rooms
            }
        };

        console.log('Request URL:', bookingApi.defaults.baseURL + '/accommodations/availability');
        console.log('Request Body:', requestBody);

        const response = await bookingApi.post('/accommodations/availability', requestBody);
        return response.data;
    } catch (error) {
        console.error('Error searching hotels:', error);
        throw error;
    }
};

const getBookingDetails = async (id) => {
    try {
        const response = await bookingApi.get(`/details/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting booking details:', error);
        throw error;
    }
};

const manageReservation = async (reservationData) => {
    try {
        const response = await bookingApi.post('/reserve', reservationData);
        return response.data;
    } catch (error) {
        console.error('Error managing reservation:', error);
        throw error;
    }
};

module.exports = {
    searchHotels,
    getBookingDetails,
    manageReservation
};
