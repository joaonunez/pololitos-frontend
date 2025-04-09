// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import serviceReducer from "./service/serviceSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
  },
});

export default store;
