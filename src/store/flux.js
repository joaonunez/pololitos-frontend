const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: JSON.parse(localStorage.getItem("user")) || null, // Cargar el usuario desde localStorage
      categories: null,
    },
    actions: {
      // Guarda el usuario en el store y localStorage
      setUser: (user) => {
        // Almacenar el usuario y el token en localStorage
        localStorage.setItem("user", JSON.stringify(user)); // Guardar en el localStorage
        setStore({ user });
      },

      // Iniciar sesión
      login: async (email, password) => {
        try {
          const response = await fetch(
            "http://localhost:8080/api/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                emailLogin: email,
                passwordLogin: password,
              }),
            }
          );

          if (!response.ok) {
            const err = await response.text();
            throw new Error(err || "Login fallido");
          }

          const data = await response.json();

          const user = {
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            profileImage: data.profileImage,
            phone: data.phone,
            city: data.city,
            token: data.token,
          };

          setStore({ user });
          localStorage.setItem("user", JSON.stringify(user));

          return { success: true, data };
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
          return { success: false, message: error.message };
        }
      },

      // Obtener datos del perfil desde el store (sin necesidad de hacer una nueva petición)
      getProfileData: () => {
        const { user } = getStore(); // Obtén el usuario desde el store
        // Si no hay un usuario logeado, redirigir al login
        if (!user) {
          window.location.href = "/login"; // Cambiarlo por navigate('/login') si se usa react-router-dom
          return;
        }
        // Si el usuario está logeado, simplemente retornamos los datos del perfil
        return { success: true, data: user };
      },

      // Verificar el token al recargar la página y obtener el usuario
      verifyToken: () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.token) {
          return true;
        } else {
          return false;
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem("user");
        setStore({ user: null });
      },
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
      getPaginatedServices: async (page = 0, size = 8) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/services/paginated?page=${page}&size=${size}`
          );
          if (!response.ok)
            throw new Error("Failed to fetch paginated services");

          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error al cargar servicios paginados:", error);
          return null;
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
          const response = await fetch(`http://localhost:8080/api/services/public/service/${id}`);
      
          if (!response.ok) throw new Error("No se pudo obtener el servicio público");
      
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
          const response = await fetch(`http://localhost:8080/api/requests/my-sent/active?page=${page}&size=${size}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
          const response = await fetch(`http://localhost:8080/api/requests/my-sent/inactive?page=${page}&size=${size}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
          const response = await fetch("http://localhost:8080/api/requests/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ serviceId, message }),
          });
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
          const response = await fetch(`http://localhost:8080/api/requests/${requestId}/${action}`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
      
      
      
      
      
    },
  };
};

export default getState;
