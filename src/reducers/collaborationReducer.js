const initialState = {
    sharedTrips: [],
    error: null,
};

const collaborationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SHARED_TRIP':
            return {
                ...state,
                sharedTrips: [...state.sharedTrips, action.payload],
            };
        case 'REMOVE_SHARED_TRIP':
            return {
                ...state,
                sharedTrips: state.sharedTrips.filter(trip => trip.id !== action.payload.id),
            };
        case 'SET_COLLABORATION_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default collaborationReducer;
