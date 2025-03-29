import React from "react";
import PropTypes from "prop-types";

const CarouselServices = ({ categoryName, services }) => {
  return (
    <div>
      <h2 className="text-white mt-4">{categoryName}</h2>
      {services.length === 0 && (
        <p className="text-white-50">No services available in this category.</p>
      )}

      {services.length > 0 && (
        <div className="position-relative">
          <div className="servicio-carrusel">
            <div className="servicio-carrusel-inner">
              {services.map((service) => (
                <div className="servicio-card" key={service.id}>
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
                        <strong>Price:</strong> ${service.price.toLocaleString("es-CL")}
                      </p>
                      <p className="card-text">
                        <small>
                          Autor: {service.userFullName}
                        </small>
                      </p>
                      <div className="mt-auto m-auto text-center">
                        <a
                          href={`/service/details/${service.id}`}
                          className="btn btn-primary btn-sm me-2 mb-2"
                        >
                          <i className="bi bi-hand-index-thumb"></i> Request Service
                        </a>
                        <br />
                        <button
                          className="btn btn-outline-light btn-sm mb-2"
                          onClick={() =>
                            alert(
                              `Simulate contacting ${service.user.firstName} about the service "${service.name}"`
                            )
                          }
                        >
                          <i className="bi bi-chat-dots"></i> Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CarouselServices.propTypes = {
  categoryName: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired,
};

export default CarouselServices;
