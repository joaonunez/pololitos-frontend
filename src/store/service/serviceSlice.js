// store/service/serviceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    paginated: {
      content: [],
      totalPages: 0,
      totalElements: 0,
      pageNumber: 0,
      pageSize: 8,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setPaginatedServices(state, action) {
      state.paginated = action.payload;
      state.loading = false;
      state.error = null;
    },
    setServicesLoading(state) {
      state.loading = true;
    },
    setServicesError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setPaginatedServices,
  setServicesLoading,
  setServicesError,
} = serviceSlice.actions;

export default serviceSlice.reducer;
