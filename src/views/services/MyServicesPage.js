import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/context";

export default function MyServicesPage() {
  const { store, actions } = useContext(Context);
  const [myServices, setMyServices] = useState([]);

  useEffect(() => {
    const fetchMyServices = async () => {
      const allServices = await actions.getPublicServices();
      const user = store.user;

      if (!user) {
        console.warn("Usuario no logueado");
        return;
      }

      // Filtrar servicios del usuario en sesión
      const filtered = allServices?.filter(
        (service) =>
          service.userFullName === `${user.firstName} ${user.lastName}`
      );

      setMyServices(filtered || []);
    };

    fetchMyServices();
  }, [store.user]);

  return (
    <div className="d-flex flex-column">
      <main className="container py-5 text-white">
        <h1 className="text-center mb-4">Mis Servicios</h1>

        {myServices.length > 0 ? (
          <div className="row justify-content-center">
            {myServices.map((servicio) => (
              <div key={servicio.id} className="col-md-3 col-sm-6 mb-4">
                <div className="card bg-dark text-white h-100">
                  <a href={`/service/details/${servicio.id}`}>
                    <img
                      src={servicio.imageUrl}
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                      alt={servicio.name}
                    />
                  </a>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">
                      {servicio.name}
                    </h5>
                    <p className="card-text mb-1">
                      <strong>Precio:</strong> $
                      {servicio.price.toLocaleString("es-CL")}
                    </p>
                    <p className="card-text">
                      <small>Autor: {servicio.userFullName}</small>
                    </p>

                    <div className="mt-auto">
                      <div className="d-flex flex-column gap-2">
                       
                        <button
                          className="btn btn-primary w-100 btn-uniform"
                          onClick={() => alert("¿Eliminar servicio?")}
                        >
                            <i className="bi bi-eye me-1"></i> Ver detalles
                        </button>{" "}
                        <button
                          className="btn btn-secondary w-100 btn-uniform"
                          onClick={() => alert("¿Eliminar servicio?")}
                        >
                          <i className="bi bi-pencil me-1"></i> Editar
                        </button>
                        <button
                          className="btn btn-danger w-100 btn-uniform"
                          onClick={() => alert("¿Eliminar servicio?")}
                        >
                          <i className="bi bi-trash me-1"></i> Eliminar
                        </button>
                      </div>
                    </div>



                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center fs-5">No tienes servicios publicados.</p>
        )}

        <div className="text-center mt-4">
          <a href="/create-service" className="btn btn-success btn-lg">
            Publicar un nuevo servicio
          </a>
        </div>
      </main>
    </div>
  );
}
