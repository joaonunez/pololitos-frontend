import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../store/context";

export default function ProfileServicePage() {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      let allServices = store.services;
  
      // Si no hay servicios en el store, intenta cargarlos
      if (!allServices || allServices.length === 0) {
        allServices = await actions.getPublicServices();
      }
  
      if (allServices && allServices.length > 0) {
        const found = allServices.find((s) => s.id === parseInt(id));
        setService(found || null);
      }
    };
  
    loadService();
  }, [store.services, id]);
  
  

  if (!service) return <p className="text-white text-center">Cargando servicio...</p>;

  const user = store.user;
  const isAuthor = user && `${user.firstName} ${user.lastName}` === service.userFullName;

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
                <strong>Precio:</strong> ${service.price.toLocaleString("es-CL")}
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
          <form>
            <textarea
              className="form-control mb-3"
              placeholder="Mensaje para el proveedor..."
              required
            ></textarea>
            <button type="submit" className="btn btn-success">
              Enviar Solicitud
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
