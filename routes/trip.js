const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');
const { makePrediction } = require('../ai');

// Create a new trip
router.post('/', authMiddleware, async (req, res) => {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json({ message: 'Trip created successfully' });
});

// Get a trip by ID
router.get('/:id', authMiddleware, async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    res.json(trip);
});

// Update a trip by ID
router.put('/:id', authMiddleware, async (req, res) => {
    await Trip.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Trip updated successfully' });
});

// Delete a trip by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted successfully' });
});

// Add a new activity to an existing trip
router.post('/:id/activity', authMiddleware, async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    trip.activities.push(req.body.activity);
    await trip.save();
    res.status(201).json({ message: 'Activity added successfully', trip });
});

// Update an existing activity within a trip
router.put('/:id/activity/:activityId', authMiddleware, async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    const activityIndex = trip.activities.findIndex(activity => activity._id.toString() === req.params.activityId);
    if (activityIndex === -1) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    trip.activities[activityIndex] = req.body.activity;
    await trip.save();
    res.json({ message: 'Activity updated successfully', trip });
});

// Delete an existing activity within a trip
router.delete('/:id/activity/:activityId', authMiddleware, async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    const activityIndex = trip.activities.findIndex(activity => activity._id.toString() === req.params.activityId);
    if (activityIndex === -1) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    trip.activities.splice(activityIndex, 1);
    await trip.save();
    res.json({ message: 'Activity deleted successfully', trip });
});

// Get all trips for a specific user
router.get('/user/:userId', authMiddleware, async (req, res) => {
    const trips = await Trip.find({ userId: req.params.userId });
    res.json(trips);
});

// Get activity recommendations for a trip
router.post('/:id/recommendations', authMiddleware, async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    const userPreferences = req.body.userPreferences;
    const recommendedActivities = makePrediction(userPreferences);
    res.json({ recommendedActivities });
});

// Get optimized route for a trip
router.post('/:id/optimize-route', authMiddleware, async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    const preferences = req.body.preferences;
    // Simulate optimized route (replace with real integration)
    const optimizedRoute = ["location1", "location2", "location3"];
    res.json({ optimizedRoute });
});

module.exports = router;
