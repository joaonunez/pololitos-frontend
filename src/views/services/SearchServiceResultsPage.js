import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../store/context";

export default function SearchServiceResultsPage() {
  const { actions } = useContext(Context);
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results.content);
      setTotalPages(location.state.results.totalPages);
      setCurrentPage(location.state.results.number);
      setSearchTerm(location.state.results.searchTerm || "");
    }
  }, [location.state]);

  const fetchResults = async (page) => {
    const term = location.state?.results?.searchTerm || "";
    const result = await actions.searchServices(term, page);
    if (result.success) {
      setResults(result.data.content);
      setTotalPages(result.data.totalPages);
      setCurrentPage(result.data.number);
      setSearchTerm(term);
    }
  };

  return (
    <div className="container py-5 text-white">
      <h1 className="text-center mb-4">Resultados de búsqueda</h1>
      {searchTerm && (
        <h5 className="text-center mb-5">
          Palabra clave: <span className="text-warning">{searchTerm}</span>
        </h5>
      )}

      {results.length > 0 ? (
        <div className="row justify-content-center">
          {results.map((servicio) => (
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
                  <h5 className="card-title text-truncate">{servicio.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Precio:</strong> ${" "}
                    {servicio.price.toLocaleString("es-CL")}
                  </p>
                  <p className="card-text">
                    <small>Autor: {servicio.userFullName}</small>
                  </p>
                  <a
                    className="btn btn-primary mt-auto w-100 btn-uniform"
                    href={`/service/details/${servicio.id}`}
                  >
                    <i className="bi bi-eye me-1"></i> Ver detalles
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center fs-5">
          No se encontraron servicios con esa palabra.
        </p>
      )}

      {totalPages > 1 && (
        <div className="text-center mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm mx-1 ${
                i === currentPage ? "btn-light" : "btn-outline-light"
              }`}
              onClick={() => fetchResults(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
