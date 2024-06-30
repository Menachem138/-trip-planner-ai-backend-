const mongoose = require('mongoose');
const User = require('./models/User');

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/tripplanner';

async function checkUserInDatabase(email) {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find user by email
        const user = await User.findOne({ email });

        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User not found');
        }

        // Close the MongoDB connection
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error checking user in database:', error.message);
    }
}

// Replace with the actual email to check
const emailToCheck = 'testuser@example.com';

checkUserInDatabase(emailToCheck);
