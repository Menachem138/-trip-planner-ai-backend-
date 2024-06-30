require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tripplanner', { useNewUrlParser: true, useUnifiedTopology: true });

const userRouter = require('./routes/user');
const tripRouter = require('./routes/trip');

app.use('/api/user', userRouter);
app.use('/api/trip', tripRouter);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
