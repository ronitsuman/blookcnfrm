// filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  city: '',
  spaceType: '',
  footfallRange: '',
  priceRange: '',
  weekdayFootfall: '',
  weekendFootfall: '',
  ageGroup: ''
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilters: () => initialState
  }
});

export const { setFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;