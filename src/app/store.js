import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import uiReducer from '../features/ui/uiSlice';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});
