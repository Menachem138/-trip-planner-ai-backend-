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
const io = socketIo(server);

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tripplanner', { useNewUrlParser: true, useUnifiedTopology: true });

const userRouter = require('./routes/user');
const tripRouter = require('./routes/trip');

app.use('/api/user', userRouter);
app.use('/api/trip', tripRouter);

io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
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

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
