const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: JSON.parse(localStorage.getItem("user")) || null, // Cargar el usuario desde localStorage
      categories: null,
    },
    actions: {
  
      getCategoryService: async () => {
        const store = getStore();
        if (store.categories) return store.categories;

        try {
          const response = await fetch("http://localhost:8080/api/categories");
          if (!response.ok) throw new Error("Failed to fetch categories");

          const data = await response.json();
          setStore({ categories: data });
          return data;
        } catch (error) {
          console.error("Error loading categories:", error);
          return null;
        }
      },

      updateService: async (serviceId, formData) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/services/update/${serviceId}`,
            {
              method: "PATCH",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            }
          );

          if (!response.ok) throw new Error(await response.text());

          // Si el backend no devuelve el objeto, podrías volver a pedir la página actual si quieres
          return { success: true };
        } catch (error) {
          console.error("Error al actualizar:", error);
          return { success: false, message: error.message };
        }
      },
      deleteService: async (id) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "Token requerido" };

        try {
          const res = await fetch(
            `http://localhost:8080/api/services/delete/${id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!res.ok) throw new Error(await res.text());

          // La vista puede volver a cargar la página actual
          return { success: true };
        } catch (err) {
          console.error("Error al eliminar:", err);
          return { success: false, message: err.message };
        }
      },
      createService: async (formData) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            "http://localhost:8080/api/services/post-service",
            {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: formData,
            }
          );

          if (!response.ok) throw new Error(await response.text());

          const newService = await response.json();

          // No setStore — la vista puede hacer push manual o recargar
          return { success: true, data: newService };
        } catch (error) {
          console.error("Error al crear servicio:", error);
          return { success: false, message: error.message };
        }
      },
      getMyServicesPaginated: async (page = 0, size = 8) => {
        const store = getStore();
        const token = store.user?.token;

        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/services/my-services?page=${page}&size=${size}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok)
            throw new Error("Error al obtener servicios del usuario");

          const data = await response.json();
          return { success: true, data };
        } catch (error) {
          console.error("Error al obtener servicios del usuario:", error);
          return { success: false, message: error.message };
        }
      },
      getServiceById: async (id) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return null;

        try {
          const response = await fetch(
            `http://localhost:8080/api/services/my-service/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) throw new Error("No autorizado o no encontrado");

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error al obtener servicio por ID:", error);
          return null;
        }
      },
      getPublicServiceById: async (id) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/services/public/service/${id}`
          );

          if (!response.ok)
            throw new Error("No se pudo obtener el servicio público");

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error al obtener servicio público:", error);
          return null;
        }
      },
      getMySentActiveRequests: async (page = 0, size = 2) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/requests/my-sent/active?page=${page}&size=${size}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) throw new Error(await response.text());
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching active requests:", error);
          return { success: false, message: error.message };
        }
      },

      getMySentInactiveRequests: async (page = 0, size = 2) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/requests/my-sent/inactive?page=${page}&size=${size}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) throw new Error(await response.text());
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching inactive requests:", error);
          return { success: false, message: error.message };
        }
      },
      createRequest: async (serviceId, message) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            "http://localhost:8080/api/requests/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ serviceId, message }),
            }
          );
          if (!response.ok) throw new Error(await response.text());
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error creating request:", error);
          return { success: false, message: error.message };
        }
      },
      updateRequestStatus: async (requestId, action) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/requests/${requestId}/${action}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
          }
          // Suponiendo que el backend retorna un mensaje en texto
          const resultText = await response.text();
          return { success: true, message: resultText };
        } catch (error) {
          console.error("Error updating request status:", error);
          return { success: false, message: error.message };
        }
      },
      getMyReceivedActiveRequests: async (page = 0, size = 4) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/requests/my-received/active?page=${page}&size=${size}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) throw new Error(await response.text());
          const data = await response.json();
          // data tendrá la estructura: { content, number, totalPages, ... }
          return data;
        } catch (error) {
          console.error("Error fetching received active requests:", error);
          return { success: false, message: error.message };
        }
      },

      getMyReceivedInactiveRequests: async (page = 0, size = 4) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/requests/my-received/inactive?page=${page}&size=${size}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) throw new Error(await response.text());
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching received inactive requests:", error);
          return { success: false, message: error.message };
        }
      },
      createChat: async (requesterId, requestId) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/chats/create?requesterId=${requesterId}&requestId=${requestId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) throw new Error(await response.text());
          const data = await response.json();
          return { success: true, data };
        } catch (error) {
          console.error("Error creating chat:", error);
          return { success: false, message: error.message };
        }
      },
      getChat: async (chatId, userId) => {
        const store = getStore();
        const token = store.user?.token;
        if (!token) return { success: false, message: "No autenticado" };

        try {
          const response = await fetch(
            `http://localhost:8080/api/chats/view/${chatId}?userId=${userId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) throw new Error(await response.text());
          const data = await response.json();
          return { success: true, data };
        } catch (error) {
          console.error("Error al obtener el chat:", error);
          return { success: false, message: error.message };
        }
      },     
    },
  };
};

export default getState;
