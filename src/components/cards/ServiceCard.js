import React from "react";
import PropTypes from "prop-types";

export default function ServiceCard({ service }) {
  const fallbackImage = "https://res.cloudinary.com/dwz4chwv7/image/upload/v1743691666/settings_palv37.png";
  const imageUrl = service.image_url || fallbackImage;

  return (
    <div className="card bg-dark text-white h-100">
      <a href={`/service/details/${service.id}`}>
        <img
          src={imageUrl}
          className="card-img-top"
          style={{ height: "220px", objectFit: "cover" }}
          alt={service.name}
        />
      </a>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{service.name}</h5>
        <p className="card-text mb-1">
          <strong>Precio:</strong> ${service.price.toLocaleString("es-CL")}
        </p>
        <p className="card-text">
          <small>Autor: {service.user.first_name} {service.user.last_name}</small>
        </p>
        <div className="mt-auto m-auto text-center">
          <a
            className="btn btn-primary mt-auto w-100 btn-uniform"
            href={`/service/details/${service.id}`}
          >
            <i className="bi bi-eye me-1"></i> Ver detalles
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};
