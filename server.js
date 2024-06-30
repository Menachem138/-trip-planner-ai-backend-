require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const jwt = require('jsonwebtoken');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Allow requests from any origin
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});

// Middleware to set Access-Control-Allow-Origin header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware to handle preflight OPTIONS requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

app.use(express.json());

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Log the MONGODB_URI to verify it's set correctly
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userRouter = require('./routes/user');
const tripRouter = require('./routes/trip');

app.use('/api/user', userRouter);
app.use('/api/trip', tripRouter);

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        console.error('WebSocket Authentication error: No token provided.');
        return next(new Error('Authentication error'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Using environment variable for JWT secret
        socket.user = decoded;
        console.log('WebSocket Token verified successfully:', decoded);
        next();
    } catch (err) {
        console.error('WebSocket Invalid token:', err.message);
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinTrip', (tripId) => {
        socket.join(tripId);
        console.log(`Client joined trip: ${tripId}`);
    });

    socket.on('leaveTrip', (tripId) => {
        socket.leave(tripId);
        console.log(`Client left trip: ${tripId}`);
    });

    socket.on('tripUpdated', (tripId, update) => {
        io.to(tripId).emit('tripUpdated', update);
        console.log(`Trip ${tripId} updated: ${JSON.stringify(update)}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the JWT_SECRET to verify it's set correctly
});
