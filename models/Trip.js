const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    activities: [{ type: String }]
});

module.exports = mongoose.model('Trip', TripSchema);
