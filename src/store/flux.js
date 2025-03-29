const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: JSON.parse(localStorage.getItem("user")) || null, // Cargar el usuario desde localStorage
      services: null,
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
    },
  };
};

export default getState;
