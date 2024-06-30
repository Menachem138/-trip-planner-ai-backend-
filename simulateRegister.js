const axios = require('axios');

// Replace with the actual user credentials
const username = 'testuser';
const email = 'testuser@example.com';
const password = 'password123';

async function simulateRegister() {
    try {
        const response = await axios.post('http://localhost:5000/api/user/register', {
            username,
            email,
            password
        });

        console.log('User registered successfully:', response.data);
    } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data : error.message);
    }
}

simulateRegister();
