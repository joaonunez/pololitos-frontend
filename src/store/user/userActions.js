// store/user/userActions.js
import { setUser, updateUser, logout } from "./userSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || "Login fallido");
    }

    const data = await response.json();
    const user = {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      profilePicture: data.profile_picture,
      phone: data.phone,
      city: data.city,
      token: data.token,
    };

    dispatch(setUser(user));
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateProfile = (formData) => async (dispatch, getState) => {
    const token = getState().user.currentUser?.token;
    if (!token) {
      return { success: false, message: "No autenticado" };
    }
  
    try {
      const response = await fetch(
        "http://localhost:8000/api/users/profile/update",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, message: errorText };
      }
  
      const data = await response.json();
      const updatedUser = {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        profilePicture: data.profile_picture || "",
        phone: data.phone,
        city: data.city,
        token, // conserva el token
      };
  
      dispatch(updateUser(updatedUser));
      return { success: true, data: updatedUser };
    } catch (error) {
      return { success: false, message: "Error inesperado" };
    }
  };

export const verifyToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? true : false;
};

export const getProfileData = () => (dispatch, getState) => {
  const user = getState().user.currentUser;
  if (!user) {
    window.location.href = "/login";
    return;
  }
  return { success: true, data: user };
};
