import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/context";

export default function ProfileServicePage() {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      const fetchedService = await actions.getPublicServiceById(id);
      setService(fetchedService || null);
    };
    loadService();
  }, [id, actions]);

  if (!service)
    return <p className="text-white text-center">Cargando servicio...</p>;

  const user = store.user;
  const isAuthor = user && user.id === service.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actions.createRequest(service.id, message);
    if (result && result.requestId) {
      // Redirigir a my-requests-sent al crear la solicitud exitosamente
      navigate("/my-requests-sent");
    } else {
      setRequestStatus("Error al enviar solicitud: " + (result.message || "Error desconocido"));
    }
  };

  return (
    <div className="container py-4 text-white">
      {/* Detalles del servicio */}
      <div className="card mb-4 bg-dark text-white">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={service.imageUrl}
              className="img-fluid rounded-start"
              alt={service.name}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h3 className="card-title">{service.name}</h3>
              <p className="card-text">{service.description}</p>
              <p className="card-text mb-1">
                <strong>Precio:</strong> $
                {service.price.toLocaleString("es-CL")}
              </p>
              <p>
                <strong>Ciudad:</strong> {service.city}
              </p>
              <p>
                <strong>Fecha de publicación:</strong>{" "}
                {new Date(service.createdAt).toLocaleDateString("es-CL")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Promedio de calificaciones (visual simulado) */}
      <div className="card bg-dark text-white mb-4 p-4">
        <h5>Promedio de Calificación</h5>
        <div className="fs-4">⭐⭐⭐⭐☆ (4.2)</div>
      </div>

      {/* Formulario de solicitud (solo si no es el autor) */}
      {!isAuthor && (
        <div className="card bg-dark text-white mb-4 p-4">
          <h5>Enviar Solicitud</h5>
          <form onSubmit={handleSubmit}>
            <textarea
              className="form-control mb-3"
              placeholder="Mensaje para el proveedor..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-success">
              Enviar Solicitud
            </button>
          </form>
          {requestStatus && <p className="mt-3">{requestStatus}</p>}
        </div>
      )}
    </div>
  );
}
