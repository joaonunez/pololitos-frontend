import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../store/context";
import ServiceCard from "../../components/cards/ServiceCard";

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
      setCurrentPage(location.state.results.pageNumber);
      setSearchTerm(location.state.results.searchTerm || "");
    }
  }, [location.state]);

  const fetchResults = async (page) => {
    const term = location.state?.results?.searchTerm || "";
    const result = await actions.searchServices(term, page);
    if (result.success) {
      setResults(result.data.content);
      setTotalPages(result.data.totalPages);
      setCurrentPage(result.data.pageNumber);
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
          {results.map((service) => (
            <div key={service.id} className="col-md-3 col-sm-6 mb-4">
              <ServiceCard service={service} />
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
