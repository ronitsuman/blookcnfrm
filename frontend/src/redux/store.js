// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import filterReducer from './filterSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    filters:filterReducer,
  },
});

export default store; 
