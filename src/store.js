import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import tripReducer from './reducers/tripReducer';
import collaborationReducer from './reducers/collaborationReducer';

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
