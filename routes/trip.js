const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require('mongoose');
const { optimizeRoute } = require('../routeOptimization');
const { recommendActivities } = require('../activityRecommendation');

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
    const recommendedActivities = await recommendActivities(userPreferences, trip);
    res.json({ recommendedActivities });
});

// Get optimized route for a trip
router.post('/:id/optimize-route', authMiddleware, async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    try {
        const optimizedRoute = await optimizeRoute(trip);
        res.json({ optimizedRoute });
    } catch (error) {
        res.status(500).json({ message: 'Error optimizing route', error });
    }
});

// Share a trip with another user
router.post('/:id/share', authMiddleware, async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    const { userId } = req.body;
    console.log('Received userId:', userId); // Log the received userId
    try {
        const objectId = new mongoose.Types.ObjectId(userId);
        console.log('Converted ObjectId:', objectId); // Log the converted ObjectId
        console.log('SharedWith before:', trip.sharedWith.map(id => id.toString())); // Log the sharedWith array before comparison
        if (!trip.sharedWith.map(id => id.toString()).includes(objectId.toString())) {
            trip.sharedWith.push(objectId);
            await trip.save();
        }
        console.log('SharedWith after:', trip.sharedWith.map(id => id.toString())); // Log the sharedWith array after comparison
        res.status(200).json({ message: 'Trip shared successfully', trip });
    } catch (error) {
        console.error('Error sharing trip:', error); // Log the error
        res.status(400).json({ message: 'Invalid user ID' });
    }
});

// Get all trips shared with a specific user
router.get('/shared/:userId', authMiddleware, async (req, res) => {
    const trips = await Trip.find({ sharedWith: req.params.userId });
    res.json(trips);
});

module.exports = router;
