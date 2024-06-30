const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tripplanner', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Check user credentials
const checkUserCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            console.log('Credentials are valid');
        } else {
            console.log('Invalid credentials');
        }
    } catch (error) {
        console.error('Error checking user credentials:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Replace with the email and password to check
const email = '1menmen138@gmail.com';
const password = process.env.Gmail_password;

checkUserCredentials(email, password);
