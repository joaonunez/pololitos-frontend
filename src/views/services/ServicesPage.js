import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaginatedServices } from "../../store/service/serviceActions";
import ServiceFilter from "../../components/offcanvas/ServiceFilter";
import ServiceCard from "../../components/cards/ServiceCard";

export default function ServicesPage() {
  const dispatch = useDispatch();
  const { content, totalPages, pageNumber } = useSelector(
    (state) => state.service.paginated
  );
  const loading = useSelector((state) => state.service.loading);
  const error = useSelector((state) => state.service.error);

  useEffect(() => {
    dispatch(getPaginatedServices(0)); // Cargar primera página
  }, [dispatch]);

  const handlePrev = () => {
    if (pageNumber > 0) {
      dispatch(getPaginatedServices(pageNumber - 1));
    }
  };

  const handleNext = () => {
    if (pageNumber + 1 < totalPages) {
      dispatch(getPaginatedServices(pageNumber + 1));
    }
  };

  return (
    <div className="d-flex flex-column">
      <main className="container py-5 text-white">
        <div className="d-flex justify-content-between mb-4">
          <button
            className="btn btn-outline-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasFilter"
          >
            <i className="bi bi-funnel"></i> Filters
          </button>
          <span>Página {pageNumber + 1} de {totalPages}</span>
        </div>

        <ServiceFilter />

        <h1 className="text-center mb-4">Servicios</h1>

        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row justify-content-center">
          {content.map((service) => (
            <div className="col-md-3 col-sm-6 mb-4" key={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center mt-4 gap-3">
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={pageNumber === 0}
          >
            ← Anterior
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleNext}
            disabled={pageNumber + 1 >= totalPages}
          >
            Siguiente →
          </button>
        </div>
      </main>
    </div>
  );
}
