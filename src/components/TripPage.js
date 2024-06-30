import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const TripPage = () => {
    const { id: tripId } = useParams();
    const [activities, setActivities] = useState([]);
    const [sharedWith, setSharedWith] = useState([]);
    const [shareUserId, setShareUserId] = useState('');
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RVc2VySWQiLCJpYXQiOjE3MTk3MjQ5NDUsImV4cCI6MTcxOTcyODU0NX0.oXCVeedAJrYLzy-G0KWSSyVofIlBgjcuSu5_db-18mw'; // Use the new JWT token
    console.log('JWT Token:', jwtToken); // Log the JWT token

    const socket = io('http://localhost:5000', {
        auth: { token: jwtToken },
        withCredentials: true,
        extraHeaders: {
            Authorization: `Bearer ${jwtToken}`
        }
    });

    useEffect(() => {
        // Join the trip room
        socket.emit('joinTrip', tripId);

        // Listen for trip updates
        socket.on('tripUpdated', (update) => {
            setActivities(update.activities);
        });

        // Handle connection errors
        socket.on('connect_error', (err) => {
            console.error('Connection error:', err.message);
        });

        // Log successful connection
        socket.on('connect', () => {
            console.log('WebSocket connected successfully');
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

    const shareTrip = () => {
        fetch(`http://localhost:5000/api/trip/${tripId}/share`, { // Use the dynamic tripId
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({ userId: shareUserId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Trip shared successfully') {
                setSharedWith([...sharedWith, shareUserId]);
                setShareUserId('');
            } else {
                console.error('Error sharing trip:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
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
            <div>
                <h2>Share Trip</h2>
                <input
                    type="text"
                    value={shareUserId}
                    onChange={(e) => setShareUserId(e.target.value)}
                    placeholder="Enter user ID to share with"
                />
                <button onClick={shareTrip}>Share Trip</button>
                <ul>
                    {sharedWith.map((userId, index) => (
                        <li key={index}>Shared with user ID: {userId}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TripPage;
