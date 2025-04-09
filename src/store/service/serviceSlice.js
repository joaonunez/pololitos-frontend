// store/service/serviceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    // Almacenamiento separado para cada tipo de servicios
    publicPaginated: {
      content: [],
      totalPages: 0,
      totalElements: 0,
      pageNumber: 0,
      pageSize: 8,
    },
    myPaginated: {
      content: [],
      totalPages: 0,
      totalElements: 0,
      pageNumber: 0,
      pageSize: 4,
    },
    searchPaginated: {
      content: [],
      totalPages: 0,
      totalElements: 0,
      pageNumber: 0,
      pageSize: 8,
      searchTerm: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    // Acciones para cada tipo de estado paginado
    setPublicPaginatedServices(state, action) {
      state.publicPaginated = action.payload;
      state.loading = false;
      state.error = null;
    },
    setMyPaginatedServices(state, action) {
      state.myPaginated = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearchPaginatedServices(state, action) {
      state.searchPaginated = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Indicadores globales de carga y errores
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
  setPublicPaginatedServices,
  setMyPaginatedServices,
  setSearchPaginatedServices,
  setServicesLoading,
  setServicesError,
} = serviceSlice.actions;

export default serviceSlice.reducer;
