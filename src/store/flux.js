

const getState = ({ getActions, getStore, setStore }) => {
    return {
      store: {
        user: null,
        services: null,
      },
  
      actions: {
        setUser: async (user) => {
          setStore({ user });
        },
      },
    };
  };
  
  export default getState;
  