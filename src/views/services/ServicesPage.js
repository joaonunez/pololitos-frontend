import React, { useEffect, useState, useContext } from "react";
import ServiceFilter from "../../components/offcanvas/ServiceFilter";

import { Context } from "../../store/context";
import ServiceCard from "../../components/cards/ServiceCard";

export default function ServicesPage() {
  const { actions } = useContext(Context);
  const [services, setServices] = useState([]);
  const [pageInfo, setPageInfo] = useState({ totalPages: 0, currentPage: 0 });

  useEffect(() => {
    loadPage(0); // Cargar primera página
  }, []);

  const loadPage = async (pageNumber) => {
    const paginatedData = await actions.getPaginatedServices(pageNumber, 8);
    if (paginatedData) {
      setServices(paginatedData.content);
      setPageInfo({ totalPages: paginatedData.totalPages, currentPage: pageNumber });
    }
  };

  const handlePrev = () => {
    if (pageInfo.currentPage > 0) {
      loadPage(pageInfo.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pageInfo.currentPage + 1 < pageInfo.totalPages) {
      loadPage(pageInfo.currentPage + 1);
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
          <span>Página {pageInfo.currentPage + 1} de {pageInfo.totalPages}</span>
        </div>

        <ServiceFilter />

        <h1 className="text-center mb-4">Servicios</h1>

        <div className="row justify-content-center">
          {services.map((service) => (
            <div className="col-md-3 col-sm-6 mb-4" key={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* Botones de paginación */}
        <div className="d-flex justify-content-center mt-4 gap-3">
          <button className="btn btn-secondary" onClick={handlePrev} disabled={pageInfo.currentPage === 0}>
            ← Anterior
          </button>
          <button className="btn btn-secondary" onClick={handleNext} disabled={pageInfo.currentPage + 1 >= pageInfo.totalPages}>
            Siguiente →
          </button>
        </div>
      </main>
    </div>
  );
}
