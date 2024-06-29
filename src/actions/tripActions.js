// Action Types
export const CREATE_TRIP_REQUEST = 'CREATE_TRIP_REQUEST';
export const CREATE_TRIP_SUCCESS = 'CREATE_TRIP_SUCCESS';
export const CREATE_TRIP_FAILURE = 'CREATE_TRIP_FAILURE';
export const FETCH_TRIPS_REQUEST = 'FETCH_TRIPS_REQUEST';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_FAILURE = 'FETCH_TRIPS_FAILURE';
export const UPDATE_TRIP_REQUEST = 'UPDATE_TRIP_REQUEST';
export const UPDATE_TRIP_SUCCESS = 'UPDATE_TRIP_SUCCESS';
export const UPDATE_TRIP_FAILURE = 'UPDATE_TRIP_FAILURE';
export const DELETE_TRIP_REQUEST = 'DELETE_TRIP_REQUEST';
export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS';
export const DELETE_TRIP_FAILURE = 'DELETE_TRIP_FAILURE';

// Action Creators
export const createTripRequest = (tripData) => ({
    type: CREATE_TRIP_REQUEST,
    payload: tripData,
});

export const createTripSuccess = (trip) => ({
    type: CREATE_TRIP_SUCCESS,
    payload: trip,
});

export const createTripFailure = (error) => ({
    type: CREATE_TRIP_FAILURE,
    payload: error,
});

export const fetchTripsRequest = () => ({
    type: FETCH_TRIPS_REQUEST,
});

export const fetchTripsSuccess = (trips) => ({
    type: FETCH_TRIPS_SUCCESS,
    payload: trips,
});

export const fetchTripsFailure = (error) => ({
    type: FETCH_TRIPS_FAILURE,
    payload: error,
});

export const updateTripRequest = (tripData) => ({
    type: UPDATE_TRIP_REQUEST,
    payload: tripData,
});

export const updateTripSuccess = (trip) => ({
    type: UPDATE_TRIP_SUCCESS,
    payload: trip,
});

export const updateTripFailure = (error) => ({
    type: UPDATE_TRIP_FAILURE,
    payload: error,
});

export const deleteTripRequest = (tripId) => ({
    type: DELETE_TRIP_REQUEST,
    payload: tripId,
});

export const deleteTripSuccess = (tripId) => ({
    type: DELETE_TRIP_SUCCESS,
    payload: tripId,
});

export const deleteTripFailure = (error) => ({
    type: DELETE_TRIP_FAILURE,
    payload: error,
});
