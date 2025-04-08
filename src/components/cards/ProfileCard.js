import React from "react";
import PropTypes from "prop-types";
import defaultProfileImage from "../../assets/img/default-profile-image.png";
const ProfileCard = ({ user, onEdit }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="profile-card">
          <img
            src={user.profilePicture || defaultProfileImage}
            alt="Foto de perfil"
            className="img-fluid rounded-circle"
          />

          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>
            <strong>Ciudad:</strong> {user.city}
          </p>
          <p>
            <strong>Teléfono:</strong>{" "}
            <a href={`tel:${user.phone}`} className="text-info">
              {user.phone}
            </a>
          </p>
          <p>
            <strong>Correo:</strong>{" "}
            <a href={`mailto:${user.email}`} className="text-info">
              {user.email}
            </a>
          </p>
          <button className="btn btn-primary edit-button" onClick={onEdit}>
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProfileCard;
