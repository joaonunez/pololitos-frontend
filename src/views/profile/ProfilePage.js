import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ProfileCard from '../../components/cards/ProfileCard';
import defaultProfileImage from '../../assets/img/default-profile-image.png';
const ProfilePage = () => {
  const [usuario, setUsuario] = useState({
    fotoPerfil: '',
    nombre: '',
    apellido: '',
    ciudad: '',
    telefono: '',
    email: ''
  });

  useEffect(() => {
    // Simulamos la carga de datos del usuario (reemplazar con la llamada real a la API)
    const fetchUserData = async () => {
      setUsuario({
        fotoPerfil: defaultProfileImage, // Reemplazar por la URL real de la imagen
        nombre: 'Joao',
        apellido: 'Nuñez',
        ciudad: 'Santiago',
        telefono: '930344503',
        email: 'joaovaldiglesias@gmail.com',
      });
    };

    fetchUserData();
  }, []);

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
        window.location.href = '/editarPerfil'; // Cambia esta ruta según sea necesario
      }
    });
  };

  return (
    <div className="container my-5">
      <ProfileCard usuario={usuario} onEdit={confirmarEdicion} />
    </div>
  );
};

export default ProfilePage;
