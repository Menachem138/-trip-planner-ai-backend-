module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        // Join a trip room
        socket.on('joinTrip', (tripId) => {
            socket.join(tripId);
            console.log(`User joined trip room: ${tripId}`);
        });

        // Leave a trip room
        socket.on('leaveTrip', (tripId) => {
            socket.leave(tripId);
            console.log(`User left trip room: ${tripId}`);
        });

        // Handle trip updates
        socket.on('tripUpdated', (tripId, update) => {
            io.to(tripId).emit('tripUpdated', update);
            console.log(`Trip updated: ${tripId}`, update);
        });

        // Handle trip sharing
        socket.on('tripShared', (tripId, data) => {
            io.to(tripId).emit('tripShared', data);
            console.log(`Trip shared: ${tripId}`, data);
        });
    });
};
