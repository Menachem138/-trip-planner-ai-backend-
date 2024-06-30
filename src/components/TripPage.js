import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const TripPage = () => {
    const { id: tripId } = useParams();
    const [activities, setActivities] = useState([]);
    const socket = io('http://localhost:5000');

    useEffect(() => {
        // Join the trip room
        socket.emit('joinTrip', tripId);

        // Listen for trip updates
        socket.on('tripUpdated', (update) => {
            setActivities(update.activities);
        });

        // Cleanup on component unmount
        return () => {
            socket.emit('leaveTrip', tripId);
            socket.disconnect();
        };
    }, [socket, tripId]);

    const addActivity = (activity) => {
        const updatedActivities = [...activities, activity];
        setActivities(updatedActivities);
        socket.emit('tripUpdated', tripId, { activities: updatedActivities });
    };

    return (
        <div>
            <h1>Your Trip</h1>
            <button onClick={() => addActivity('New Activity')}>Add Activity</button>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                ))}
            </ul>
        </div>
    );
};

export default TripPage;
