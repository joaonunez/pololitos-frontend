import React from 'react';
import PropTypes from 'prop-types';


const ProfileCard = ({ usuario, onEdit }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="profile-card">
          <img src={usuario.fotoPerfil} alt="Foto de perfil" className="img-fluid rounded-circle" />
          <h2>{usuario.nombre} {usuario.apellido}</h2>
          <p><strong>Ciudad:</strong> {usuario.ciudad}</p>
          <p><strong>Teléfono:</strong> <a href={`tel:${usuario.telefono}`} className="text-info">{usuario.telefono}</a></p>
          <p><strong>Correo:</strong> <a href={`mailto:${usuario.email}`} className="text-info">{usuario.email}</a></p>
          <button className="btn btn-primary edit-button" onClick={onEdit}>Editar Perfil</button>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  usuario: PropTypes.shape({
    fotoPerfil: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    ciudad: PropTypes.string.isRequired,
    telefono: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProfileCard;
