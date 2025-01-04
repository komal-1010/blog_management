import {  combineReducers, createStore } from 'redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed (e.g., posts, users)
});

const store = createStore(rootReducer);

export default store;
