// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: loadUserFromStorage(), // Initialize from localStorage
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save to localStorage
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Clear localStorage on logout
    },
    setResetToken: (state, action) => {
      if (state.user) {
        state.user.resetToken = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user)); // Update localStorage
      }
    }
  },
});

export const { setUser, logoutUser,setResetToken } = userSlice.actions;
export default userSlice.reducer;