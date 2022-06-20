import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initial: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    initial(state) {
      state.initial = true;
    },
  },
});

export const { initial } = uiSlice.actions;

// selector
export const selectInitial = (state) => state.ui.initial;

export default uiSlice.reducer;
