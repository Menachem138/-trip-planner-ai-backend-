const axios = require('axios');
const jwt = require('jsonwebtoken');

// Replace with the actual JWT token obtained from the login endpoint
const token = 'YOUR_JWT_TOKEN'; // Replace with a valid JWT token

// Replace with the actual trip ID to test
const tripId = 'YOUR_TRIP_ID'; // Replace with a valid trip ID

// User preferences to be sent in the request body
const userPreferences = ['hiking', 'museums', 'restaurants'];

async function testActivityRecommendations() {
    try {
        const response = await axios.post(`http://localhost:5000/api/trip/${tripId}/recommendations`, {
            userPreferences
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Recommended Activities:', response.data.recommendedActivities);
    } catch (error) {
        console.error('Error testing activity recommendations:', error.response ? error.response.data : error.message);
    }
}

testActivityRecommendations();
