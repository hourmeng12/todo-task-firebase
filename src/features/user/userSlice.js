import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    loading(state) {
      state.loading = true;
    },
    login: {
      reducer: (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.user = action.payload;
        }
      },
      prepare: (user) => {
        return {
          payload: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
        };
      },
    },
    logout(state) {
      if (state.loading) {
        state.user = null;
        state.loading = false;
      }
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loading, login, logout, setError } = userSlice.actions;

// selector
export const selectUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
