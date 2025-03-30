import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../../store/context";
import ConfirmDeleteService from "../../components/modals/ConfirmDeleteService";

export default function MyServicesPage() {
  const { store, actions } = useContext(Context);
  const [myServices, setMyServices] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyServices = async () => {
      const allServices = store.services || (await actions.getPublicServices());
      const user = store.user;

      if (!user) return;

      const filtered = allServices?.filter(
        (s) => s.userFullName === `${user.firstName} ${user.lastName}`
      );

      setMyServices(filtered || []);
    };

    fetchMyServices();

    if (location.state?.updated) {
      Swal.fire({
        icon: "success",
        title: "Servicio actualizado",
        text: "El servicio fue editado correctamente.",
        confirmButtonColor: "#198754",
        background: "#1e1e1e",
        color: "#fff",
      });
      navigate(location.pathname, { replace: true });
    }
  }, [store.user, store.services]);
  if (location.state?.created) {
    Swal.fire({
      icon: "success",
      title: "¡Servicio publicado!",
      text: "Tu servicio fue publicado exitosamente.",
      confirmButtonColor: "#198754",
      background: "#1e1e1e",
      color: "#fff",
    });

    navigate(location.pathname, { replace: true });
  }

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
                        <a
                          className="btn btn-primary w-100 btn-uniform"
                          href={`/service/details/${servicio.id}`}
                        >
                          <i className="bi bi-eye me-1"></i> Ver detalles
                        </a>
                        <a
                          href={`/service/edit/${servicio.id}`}
                          className="btn btn-secondary w-100 btn-uniform"
                        >
                          <i className="bi bi-pencil me-1"></i> Editar
                        </a>
                        <button
                          className="btn btn-danger w-100 btn-uniform"
                          onClick={() => {
                            setServiceToDelete(servicio.id);
                            setShowDeleteModal(true);
                          }}
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

      {/* Modal para confirmar eliminación */}
      <ConfirmDeleteService
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        serviceId={serviceToDelete}
      />
    </div>
  );
}
