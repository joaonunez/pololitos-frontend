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
            href={`/service/details/${service.id}`}
            className="btn btn-primary btn-sm me-2 mb-2"
          >
            <i className="bi bi-hand-index-thumb"></i> Solicitar Servicio
          </a>
          <br />
          <button
            className="btn btn-outline-light btn-sm mb-2"
            onClick={() =>
              alert(
                `Simulate contacting ${service.user?.firstName || "Proveedor"} about the service "${service.name}"`
              )
            }
          >
            <i className="bi bi-chat-dots"></i> Contactar
          </button>
        </div>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  service: PropTypes.object.isRequired,
};
