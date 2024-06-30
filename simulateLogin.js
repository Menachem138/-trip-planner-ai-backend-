const axios = require('axios');

// Replace with the actual user credentials
const email = 'testuser@example.com'; // Replace with a valid email
const password = 'password123'; // Replace with a valid password

async function simulateLogin() {
    try {
        const response = await axios.post('http://localhost:5000/api/user/login', {
            email,
            password
        });

        const token = response.data.token;
        console.log('JWT Token:', token);
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
}

simulateLogin();
