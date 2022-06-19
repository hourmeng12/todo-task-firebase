import { createSlice } from '@reduxjs/toolkit';
import { loading } from '../user/userSlice';

const initialState = {
  initial: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    isInitial(state) {
      state.initial = true;
    },
  },
  extraReducers: {
    [loading]: (state) => {
      state.initial = true;
    },
  },
});

export const { isInitial } = uiSlice.actions;

// selector
export const selectInitial = (state) => state.ui.initial;

export default uiSlice.reducer;
