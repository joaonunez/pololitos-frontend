import React from "react";
import PropTypes from "prop-types";

export default function ServiceCard({ service }) {
  return (
    <div className="card bg-dark text-white h-100">
      <a href={`/service/details/${service.id}`}>
        <img
          src={service.imageUrl}
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
          <small>Autor: {service.userFullName}</small>
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
