import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Placeholder reducers (to be implemented)
const authReducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const tripReducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const collaborationReducer = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    trip: tripReducer,
    collaboration: collaborationReducer,
    // other reducers can be added here
});

// Create store with middleware and devtools
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
