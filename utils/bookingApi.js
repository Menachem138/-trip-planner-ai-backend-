const axios = require('axios');

const BOOKING_API_KEY = process.env.open_ai_open_ai;

const bookingApi = axios.create({
    baseURL: 'https://api.booking.com',
    headers: {
        'Authorization': `Bearer ${BOOKING_API_KEY}`
    }
});

const searchHotels = async (query) => {
    try {
        const response = await bookingApi.get('/accommodations/search', {
            params: query
        });
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
