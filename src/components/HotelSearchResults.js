import React from 'react';

const HotelSearchResults = ({ results }) => {
    return (
        <div>
            <h2>Hotel Search Results</h2>
            <ul>
                {results.map((hotel, index) => (
                    <li key={index}>
                        <h3>{hotel.name}</h3>
                        <p>{hotel.address}</p>
                        <p>Price: {hotel.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelSearchResults;
