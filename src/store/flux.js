const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: JSON.parse(localStorage.getItem("user")) || null, // Cargar el usuario desde localStorage
      services: null,
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

          // Almacenar toda la información del usuario y el token en el store y en localStorage
          setStore({
            user: {
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              profileImage: data.profileImage,
              phone: data.phone,
              city: data.city,
              token: data.token,
            },
          });

          // Guardar en localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              profileImage: data.profileImage,
              phone: data.phone,
              city: data.city,
              token: data.token,
            })
          );
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
      getPublicServices: async () => {
        const store = getStore();
        if (store.services && store.services.length > 0) {
          return store.services; // Ya están cargados
        }

        try {
          const response = await fetch(
            "http://localhost:8080/api/services/public"
          );
          if (!response.ok) throw new Error("Failed to fetch services");

          const data = await response.json();
          setStore({ services: data });
          return data;
        } catch (error) {
          console.error("Error loading services:", error);
          return null;
        }
      },
      getCategoryService: async () => {
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

        if (!token) {
          console.error("No hay token, usuario no autenticado");
          return { success: false, message: "No autenticado" };
        }

        try {
          const response = await fetch(
            `http://localhost:8080/api/services/update/${serviceId}`,
            {
              method: "PATCH",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
          }

          // ✅ Esperamos confirmación, no importa si responde el servicio o solo un OK
          await response.text(); // puede ser vacío o mensaje simple

          // ✅ Tomamos los datos ya enviados y actualizamos el store
          const updatedService = {
            id: serviceId,
            name: formData.get("name"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price")),
            city: formData.get("city"),
            imageUrl: store.services.find((s) => s.id === serviceId)?.imageUrl, // en caso de no cambiarla
            categoryId: parseInt(formData.get("category.id")),
            userFullName: store.user.firstName + " " + store.user.lastName,
          };

          // Si el usuario subió nueva imagen, se asumirá que la URL cambió
          if (formData.get("image")) {
            // Esto debería actualizarse con la nueva URL que normalmente devuelve el backend,
            // pero si el backend no responde nada útil, se deja igual
            // o podrías decidir volver a hacer `getPublicServices()`
          }

          const updatedList = store.services.map((s) =>
            s.id === serviceId ? { ...s, ...updatedService } : s
          );

          setStore({ services: structuredClone(updatedList) });

          return { success: true, data: updatedService };
        } catch (error) {
          console.error("Error al actualizar el servicio:", error);
          return { success: false, message: error.message };
        }
      },
      deleteService: async (id) => {
        const store = getStore();
        const token = store.user?.token;

        if (!token) {
          console.error("No autenticado");
          return { success: false, message: "Token requerido" };
        }

        try {
          const res = await fetch(
            `http://localhost:8080/api/services/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
          }

          // 💡 Actualiza el store
          const updatedList = store.services.filter((s) => s.id !== id);
          setStore({ services: updatedList });

          return { success: true };
        } catch (err) {
          console.error("Error al eliminar:", err);
          return { success: false, message: err.message };
        }
      },
      createService: async (formData) => {
        const store = getStore();
        const token = store.user?.token;
      
        if (!token) {
          return { success: false, message: "No autenticado" };
        }
      
        try {
          const response = await fetch(
            "http://localhost:8080/api/services/post-service",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                // No pongas Content-Type, el navegador lo arma solo para FormData
              },
              body: formData,
            }
          );
      
          if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
          }
      
          const newService = await response.json();
      
          const updatedServices = [...(store.services || []), newService];
      
          // Si además tenés un array `myServices`, actualízalo también:
          const userFullName = `${store.user.firstName} ${store.user.lastName}`;
          const isMine = newService.userFullName === userFullName;
          const updatedMyServices = isMine
            ? [...(store.myServices || []), newService]
            : store.myServices;
      
          setStore({
            services: updatedServices,
            myServices: updatedMyServices,
          });
      
          return { success: true, data: newService };
        } catch (error) {
          console.error("Error al crear servicio:", error);
          return { success: false, message: error.message };
        }
      },
      
    },
  };
};

export default getState;
