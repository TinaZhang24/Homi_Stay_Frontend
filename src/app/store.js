import { configureStore } from "@reduxjs/toolkit";
import adminApi from '../features/admin/adminSlice';
import { authApi } from '../features/auth/authSlice';
import authReducer from "../features/auth/authSlice";
import roomApi, { roomReducer } from "../features/rooms/roomSlice";
import api from "./api";  // Assuming this is a generic API slice, ensure it's correct.

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,  // Ensure this is correctly named and used
    [adminApi.reducerPath]: adminApi.reducer, // Admin API reducer
    [authApi.reducerPath]: authApi.reducer,   // Auth API reducer
    [roomApi.reducerPath]: roomApi.reducer,   // Room API reducer
    auth: authReducer,               // General authentication state
    rooms: roomReducer,              // Specific reducer for rooms state if applicable
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(adminApi.middleware)
      .concat(authApi.middleware)
      .concat(roomApi.middleware),
});

export default store;
