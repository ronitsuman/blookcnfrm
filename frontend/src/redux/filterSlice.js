import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    searchQuery: '',
    city: '',
    spaceType: '',
    priceRange: '',
    ageGroupMix: '',
  },
  reducers: {
    setFilter(state, action) {
      return { ...state, ...action.payload };
    },
    resetFilters() {
      return {
        searchQuery: '',
        city: '',
        spaceType: '',
        priceRange: '',
        ageGroupMix: '',
      };
    },
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;