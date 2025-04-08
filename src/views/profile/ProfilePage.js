import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../store/context";
import ProfileCard from "../../components/cards/ProfileCard";


const ProfilePage = () => {
  const { store } = useContext(Context); // Obtener el estado del store
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
    if (!store.user) {
        navigate('/login');
    } else {
      const { profilePicture, firstName, lastName, city, phone, email } = store.user;
      setUserData({
        profileImage: profilePicture,
        firstName,
        lastName,
        city,
        phone,
        email,
      });
    }
  }, [store.user, navigate]);

  // Confirmación de edición de perfil
  const confirmarEdicion = () => {
    Swal.fire({
      title: '¿Editar tu perfil?',
      text: 'Serás redirigido al formulario de edición.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/edit-profile'; // Redirige a la página de edición
      }
    });
  };

  return (
    <div className="container my-5">
      <ProfileCard user={userData} onEdit={confirmarEdicion} />
    </div>
  );
};

export default ProfilePage;
