const axios = require('axios');
require('dotenv').config();

const BOOKING_API_KEY = process.env.BOOKING_API_KEY;
console.log('BOOKING_API_KEY:', BOOKING_API_KEY); // Log the BOOKING_API_KEY to verify it's set correctly

const encodedApiKey = 'c2stODJKZzdURkYyZTlhdjc5T1phRWJUM0JsYmtGSlN1Y2RMUldtbzFKTmE5eFVETEhB'; // Manually encoded API key

const bookingApi = axios.create({
    baseURL: 'https://supply-xml.booking.com/hotels/xml/availability',
    headers: {
        'Authorization': `Basic ${encodedApiKey}`,
        'Content-Type': 'application/xml',
        'Accept-Version': '1.1'
    }
});

const searchHotels = async (query) => {
    const xmlQuery = `
        <request>
            <destination>${query.destination}</destination>
            <checkin_date>${query.checkin_date}</checkin_date>
            <checkout_date>${query.checkout_date}</checkout_date>
            <adults>${query.adults}</adults>
            <children>${query.children}</children>
            <rooms>${query.rooms}</rooms>
        </request>
    `;
    try {
        const response = await bookingApi.post('', xmlQuery);
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
    const xmlReservationData = `
        <reservation>
            <id>${reservationData.id}</id>
            <status>${reservationData.status}</status>
            <guest_name>${reservationData.guest_name}</guest_name>
            <checkin_date>${reservationData.checkin_date}</checkin_date>
            <checkout_date>${reservationData.checkout_date}</checkout_date>
        </reservation>
    `;
    try {
        const response = await bookingApi.post('', xmlReservationData);
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
