import { configureStore } from "@reduxjs/toolkit";

import api from "./api";
import authReducer from "../features/auth/authSlice";
import roomApi, { roomReducer } from "../features/rooms/roomSlice";
import adminApi from "../features/admin/adminSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    [roomApi.reducerPath]: roomApi.reducer,
    rooms: roomReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    // admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
