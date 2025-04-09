// store/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialUser = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: initialUser || null,
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("user");
    },
    updateUser(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
