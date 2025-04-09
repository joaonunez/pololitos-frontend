import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCard from "../../components/cards/ProfileCard";
import { confirmAlert } from "react-confirm-alert";
const ProfilePage = () => {
  const user = useSelector((state) => state.user.currentUser); 
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    profilePicture: '',
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const { profilePicture, firstName, lastName, city, phone, email } = user;
      setUserData({
        profilePicture,
        firstName,
        lastName,
        city,
        phone,
        email,
      });
    }
  }, [user, navigate]);

  const confirmarEdicion = () => {
    confirmAlert({
      title: "¿Editar tu perfil?",
      message: "Serás redirigido al formulario de edición.",
      buttons: [
        {
          label: "Sí, continuar",
          onClick: () => navigate("/edit-profile"),
        },
        {
          label: "Cancelar",
          onClick: () => {},
        },
      ],
    });
  };
  

  return (
    <div className="container my-5">
      <ProfileCard user={userData} onEdit={confirmarEdicion} />
    </div>
  );
};

export default ProfilePage;
