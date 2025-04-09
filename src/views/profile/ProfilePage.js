import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ⬅️ NUEVO
import ProfileCard from "../../components/cards/ProfileCard";

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
        window.location.href = '/edit-profile';
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
