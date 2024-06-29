import {
    CREATE_TRIP_REQUEST,
    CREATE_TRIP_SUCCESS,
    CREATE_TRIP_FAILURE,
    FETCH_TRIPS_REQUEST,
    FETCH_TRIPS_SUCCESS,
    FETCH_TRIPS_FAILURE,
    UPDATE_TRIP_REQUEST,
    UPDATE_TRIP_SUCCESS,
    UPDATE_TRIP_FAILURE,
    DELETE_TRIP_REQUEST,
    DELETE_TRIP_SUCCESS,
    DELETE_TRIP_FAILURE,
} from '../actions/tripActions';

const initialState = {
    trips: [],
    loading: false,
    error: null,
};

const tripReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRIP_REQUEST:
        case FETCH_TRIPS_REQUEST:
        case UPDATE_TRIP_REQUEST:
        case DELETE_TRIP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_TRIP_SUCCESS:
            return {
                ...state,
                trips: [...state.trips, action.payload],
                loading: false,
                error: null,
            };
        case FETCH_TRIPS_SUCCESS:
            return {
                ...state,
                trips: action.payload,
                loading: false,
                error: null,
            };
        case UPDATE_TRIP_SUCCESS:
            return {
                ...state,
                trips: state.trips.map((trip) =>
                    trip._id === action.payload._id ? action.payload : trip
                ),
                loading: false,
                error: null,
            };
        case DELETE_TRIP_SUCCESS:
            return {
                ...state,
                trips: state.trips.filter((trip) => trip._id !== action.payload),
                loading: false,
                error: null,
            };
        case CREATE_TRIP_FAILURE:
        case FETCH_TRIPS_FAILURE:
        case UPDATE_TRIP_FAILURE:
        case DELETE_TRIP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default tripReducer;
