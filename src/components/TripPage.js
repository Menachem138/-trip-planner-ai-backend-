import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const TripPage = () => {
    const { id: tripId } = useParams();
    const [activities, setActivities] = useState([]);
    const [sharedWith, setSharedWith] = useState([]);
    const [shareUserId, setShareUserId] = useState('');
    const jwtToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token from local storage
    console.log('JWT Token:', jwtToken); // Log the JWT token

    const socketRef = useRef(null);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            auth: { token: jwtToken },
            withCredentials: true,
            extraHeaders: {
                Authorization: `Bearer ${jwtToken}`
            }
        });

        socketRef.current = socket;

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
    }, [tripId, jwtToken]);

    const addActivity = (activity) => {
        const updatedActivities = [...activities, activity];
        setActivities(updatedActivities);
        socketRef.current.emit('tripUpdated', tripId, { activities: updatedActivities });
    };

    const shareTrip = () => {
        console.log('Sharing trip with user ID:', shareUserId); // Log the user ID being shared with
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
