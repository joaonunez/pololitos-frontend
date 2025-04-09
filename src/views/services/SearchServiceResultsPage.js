// Importamos React y hooks necesarios de Redux y React Router
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchServices } from "../../store/service/serviceActions";
import ServiceCard from "../../components/cards/ServiceCard";
import { useLocation } from "react-router-dom";

export default function SearchServiceResultsPage() {
  const dispatch = useDispatch();             // Hook para despachar acciones Redux
  const location = useLocation();             // Obtenemos el objeto de ubicación actual (URL + state)

  // Accedemos al estado global de Redux para obtener los resultados paginados
  const { content, totalPages, pageNumber, searchTerm } = useSelector(
    (state) => state.service.searchPaginated
  );
  const loading = useSelector((state) => state.service.loading); // Indicador de carga
  const error = useSelector((state) => state.service.error);     // Errores si hay

  /**
   *  Este useEffect se ejecuta UNA vez al montar la vista.
   * Si hay una búsqueda previa guardada en location.state (enviado desde el navbar),
   * despacha la acción searchServices con el término inicial y página 0.
   */
  useEffect(() => {
    const keyword = location.state?.results?.searchTerm;
    if (keyword) {
      dispatch(searchServices(keyword, 0));
    }
  }, [dispatch, location.state]);

  /**
   * Esta función se usa para cargar otra página de resultados.
   * Usa el mismo término original que vino desde location.state,
   * y despacha la acción con el número de página nuevo.
   */
  const fetchResults = (page) => {
    const keyword = location.state?.results?.searchTerm;
    if (keyword) {
      dispatch(searchServices(keyword, page));
    }
  };

  return (
    <div className="container py-5 text-white">
      <h1 className="text-center mb-4">Resultados de búsqueda</h1>

      {/* Mostrar el término de búsqueda si está disponible */}
      {searchTerm && (
        <h5 className="text-center mb-5">
          Palabra buscada: <span className="text-warning">{searchTerm}</span>
        </h5>
      )}

      {/* Mostrar mensajes si está cargando o si hubo error */}
      {loading && <p className="text-center">Buscando servicios...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Mostrar servicios si hay resultados */}
      {!loading && content.length > 0 ? (
        <div className="row justify-content-center">
          {content.map((service) => (
            <div key={service.id} className="col-md-3 col-sm-6 mb-4">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center fs-5">
            No se encontraron servicios con esa palabra.
          </p>
        )
      )}

      {/* Paginación si hay más de una página de resultados */}
      {totalPages > 1 && (
        <div className="text-center mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm mx-1 ${
                i === pageNumber ? "btn-light" : "btn-outline-light"
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
