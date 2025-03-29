const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: null,
      services: null,
    },

    actions: {
      // Guarda el usuario en el store
      setUser: async (user) => {
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
                "Content-Type": "application/json", // Asegúrate de que el contenido sea JSON
              },
              body: JSON.stringify({
                emailLogin: email,  // Usar JSON.stringify para enviar los datos como JSON
                passwordLogin: password,
              }),
            }
          );

          if (!response.ok) {
            const err = await response.text();
            throw new Error(err || "Login fallido");
          }

          const data = await response.json();

          // Almacena toda la información del usuario en el store
          setStore({
            user: {
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              profileImage: data.profileImage,
              phone: data.phone,
              city: data.city
            }
          });

          return { success: true, data };
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
          return { success: false, message: error.message };
        }
      },
      // Registro con imagen (FormData)
      register: async (user, file) => {
        try {
          const formData = new FormData();
          for (const key in user) {
            formData.append(key, user[key]);
          }
          if (file) {
            formData.append("fotoPerfilArchivo", file);
          }

          const response = await fetch(
            "http://localhost:8080/api/users/registro",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            const err = await response.text();
            throw new Error(err || "Registro fallido");
          }

          const data = await response.json();
          setStore({ user: data });
          return { success: true, data };
        } catch (error) {
          console.error("Error al registrarse:", error);
          return { success: false, message: error.message };
        }
      },

      // Obtener perfil
      getProfileData: async (userId) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/users/${userId}/perfil`
          );
          if (!response.ok) throw new Error("No se pudo cargar el perfil");

          const data = await response.json();
          return { success: true, data };
        } catch (error) {
          console.error("Error al obtener perfil:", error);
          return { success: false, message: error.message };
        }
      },

      // Actualizar perfil (con imagen opcional)
      actualizarPerfil: async (usuarioId, usuarioActualizado, nuevaImagen) => {
        try {
          const formData = new FormData();
          for (const key in usuarioActualizado) {
            formData.append(key, usuarioActualizado[key]);
          }
          if (nuevaImagen) {
            formData.append("fotoPerfilArchivo", nuevaImagen);
          }

          const response = await fetch(
            `http://localhost:8080/api/users/${usuarioId}/perfil`,
            {
              method: "PATCH",
              body: formData,
            }
          );

          if (!response.ok) throw new Error("Error al actualizar perfil");

          const data = await response.json();
          setStore({ user: data });
          return { success: true, data };
        } catch (error) {
          console.error("Error al actualizar perfil:", error);
          return { success: false, message: error.message };
        }
      },

      logout: () => {
        setStore({ user: null });
      },
    },
  };
};

export default getState;
