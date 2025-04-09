import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getMyServicesPaginated,
} from "../../store/service/serviceActions";
import ConfirmDeleteService from "../../components/modals/ConfirmDeleteService";

export default function MyServicesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { content, totalPages, pageNumber } = useSelector(
    (state) => state.service.myPaginated
  );
  const loading = useSelector((state) => state.service.loading);
  const error = useSelector((state) => state.service.error);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    dispatch(getMyServicesPaginated(0));

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
  }, [dispatch, location, navigate]);

  const loadPage = (page) => {
    dispatch(getMyServicesPaginated(page));
  };

  return (
    <div className="d-flex flex-column">
      <main className="container py-5 text-white">
        <h1 className="text-center mb-4">Mis Servicios</h1>

        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {content.length > 0 ? (
          <div className="row justify-content-center">
            {content.map((servicio) => (
              <div key={servicio.id} className="col-md-3 col-sm-6 mb-4">
                <div className="card bg-dark text-white h-100">
                  <a href={`/service/details/${servicio.id}`}>
                    <img
                      src={servicio.image_url}
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
                      <strong>Precio:</strong> ${" "}
                      {servicio.price.toLocaleString("es-CL")}
                    </p>
                    <p className="card-text">
                      <small>Autor: {servicio.user.first_name} {servicio.user.last_name}</small>
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
          !loading && (
            <p className="text-center fs-5">
              No tienes servicios publicados.
            </p>
          )
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="text-center mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm mx-1 ${
                  i === pageNumber ? "btn-light" : "btn-outline-light"
                }`}
                onClick={() => loadPage(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="text-center mt-4">
          <a href="/create-service" className="btn btn-success btn-lg">
            Publicar un nuevo servicio
          </a>
        </div>
      </main>

      {/* <ConfirmDeleteService
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        serviceId={serviceToDelete}
        onServiceDeleted={() => {
          setServiceToDelete(null);
          loadPage(pageNumber); // Refresca la página actual
        }}
      /> */}
    </div>
  );
}
