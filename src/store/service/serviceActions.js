// store/service/serviceActions.js
import {
    setPublicPaginatedServices,
    setMyPaginatedServices,
    setSearchPaginatedServices,
    setServicesLoading,
    setServicesError,
  } from "./serviceSlice";
  
  export const getPaginatedServices =
    (page = 0, size = 8) =>
    async (dispatch) => {
      dispatch(setServicesLoading());
  
      try {
        const response = await fetch(
          `http://localhost:8000/api/services/paginated?page=${page}&size=${size}`
        );
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error al cargar servicios paginados");
        }
  
        const data = await response.json();
        dispatch(setPublicPaginatedServices(data));
        return { success: true };
      } catch (error) {
        dispatch(setServicesError(error.message));
        console.error("Error al cargar servicios:", error);
        return { success: false, message: error.message };
      }
    };
  
  export const getMyServicesPaginated =
    (page = 0, size = 4) =>
    async (dispatch, getState) => {
      dispatch(setServicesLoading());
  
      const token = getState().user.currentUser?.token;
      if (!token) {
        dispatch(setServicesError("No autenticado"));
        return { success: false, message: "No autenticado" };
      }
  
      try {
        const response = await fetch(
          `http://localhost:8000/api/services/my-services?page=${page}&size=${size}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error al obtener servicios del usuario");
        }
  
        const data = await response.json();
        dispatch(setMyPaginatedServices(data));
        return { success: true };
      } catch (error) {
        console.error("Error al obtener servicios del usuario:", error);
        dispatch(setServicesError(error.message));
        return { success: false, message: error.message };
      }
    };
  
  export const searchServices =
    (keyword, page = 0, size = 8) =>
    async (dispatch) => {
      dispatch(setServicesLoading());
  
      try {
        const params = new URLSearchParams({
          keyword,
          page,
          size,
        });
  
        const response = await fetch(
          `http://localhost:8000/api/services/search?${params.toString()}`,
          { method: "POST" }
        );
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Error al buscar servicios");
        }
  
        const data = await response.json();
        dispatch(setSearchPaginatedServices({ ...data, searchTerm: keyword }));
  
        return { success: true, data };
      } catch (error) {
        console.error("Error al buscar servicios:", error);
        dispatch(setServicesError(error.message));
        return { success: false, message: error.message };
      }
    };
  