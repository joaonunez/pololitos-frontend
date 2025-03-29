import React from "react";

const CarouselServices = () => {
  return (
    <div>
      {/* Replace this with dynamic category rendering */}
      <h2 className="text-white mt-4">Category Name</h2>
      <p className="text-white-50">No services available in this category.</p>

      <div className="position-relative">
        <div className="servicio-carrusel" id="carrusel-example">
          <div className="servicio-carrusel-inner" id="inner-example">
            {/* Repeat this for each service */}
            <div className="servicio-card">
              <div className="card bg-dark text-white h-100">
                <a href={`/service/details/1`}>
                  <img
                    src="/img/sample.jpg"
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                    alt="Service name"
                  />
                </a>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">Service Title</h5>
                  <p className="card-text mb-1">
                    <strong>Price:</strong> $15,000
                  </p>
                  <p className="card-text">
                    <small>Author: John Doe</small>
                  </p>
                  <div className="mt-auto m-auto text-center">
                    {/* Adjust logic based on user session */}
                    <a
                      href="/service/details/1"
                      className="btn btn-primary btn-sm me-2 mb-2"
                    >
                      <i className="bi bi-hand-index-thumb"></i> Request Service
                    </a>
                    <br />
                    <button
                      className="btn btn-outline-light btn-sm mb-2"
                      onClick={() =>
                        alert("Simulate contacting John Doe about the service")
                      }
                    >
                      <i className="bi bi-chat-dots"></i> Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* End service card */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselServices;
