import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";

export default function MyRequestsReceivedPage() {
  const { actions, store } = useContext(Context);

  // Estados para solicitudes recibidas activas
  const [activeRequests, setActiveRequests] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [activeTotalPages, setActiveTotalPages] = useState(0);

  // Estados para solicitudes recibidas inactivas
  const [inactiveRequests, setInactiveRequests] = useState([]);
  const [inactivePage, setInactivePage] = useState(0);
  const [inactiveTotalPages, setInactiveTotalPages] = useState(0);

  useEffect(() => {
    loadActiveRequests(0);
    loadInactiveRequests(0);
  }, []);

  const loadActiveRequests = async (page = 0) => {
    const data = await actions.getMyReceivedActiveRequests(page, 4);
    if (data && data.content) {
      setActiveRequests(data.content);
      setActivePage(data.number);
      setActiveTotalPages(data.totalPages);
    } else {
      setActiveRequests([]);
      setActivePage(0);
      setActiveTotalPages(0);
    }
  };

  const loadInactiveRequests = async (page = 0) => {
    const data = await actions.getMyReceivedInactiveRequests(page, 4);
    if (data && data.content) {
      setInactiveRequests(data.content);
      setInactivePage(data.number);
      setInactiveTotalPages(data.totalPages);
    } else {
      setInactiveRequests([]);
      setInactivePage(0);
      setInactiveTotalPages(0);
    }
  };

  // Función para actualizar el estado de una solicitud (accept, reject, complete)
  const handleUpdateStatus = async (id, action) => {
    const result = await actions.updateRequestStatus(id, action);
    if (result.success) {
      alert(result.message);
      // Refrescar ambas listas para reflejar el cambio
      loadActiveRequests(activePage);
      loadInactiveRequests(0);
    } else {
      alert("Error: " + result.message);
    }
  };

  // Función para el chat (simulada)
  const handleChat = (id, chatCreated, requesterId) => {
    if (chatCreated) {
      alert(`Continue chat for request ${id}`);
    } else {
      alert(`Start chat for request ${id} with requester ${requesterId}`);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">My Received Requests</h2>

      {/* Sección de Solicitudes Recibidas Activas */}
      <div className="active-requests mb-5">
        <h4 className="text-warning">Active Requests</h4>
        <div className="table-responsive">
          <table className="table table-dark table-bordered table-hover text-center align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Requester</th>
                <th>Service</th>
                <th>Status</th>
                <th>Comment</th>
                <th>Actions</th>
                <th>Chat</th>
              </tr>
            </thead>
            <tbody>
              {activeRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.requesterName}</td>
                  <td>
                    <a className="servicio-link" href={`/service/details/${req.serviceId}`}>
                      {req.serviceName}
                    </a>
                  </td>
                  <td>{req.status}</td>
                  <td>{req.additionalComment}</td>
                  <td>
                    {req.status === "Enviada" && (
                      <>
                        <button
                          className="btn btn-success btn-sm mb-1 me-1"
                          onClick={() => handleUpdateStatus(req.id, "accept")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm mb-1"
                          onClick={() => handleUpdateStatus(req.id, "reject")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {req.status === "Aceptada" && (
                      <button
                        className="btn btn-outline-success btn-sm mb-1"
                        onClick={() => handleUpdateStatus(req.id, "complete")}
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        handleChat(req.id, req.chatCreated, req.requesterId)
                      }
                    >
                      {req.chatCreated ? "Continue Chat" : "Start Chat"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {activeTotalPages > 1 && (
          <div className="text-center mt-4">
            {[...Array(activeTotalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm mx-1 ${i === activePage ? "btn-light" : "btn-outline-light"}`}
                onClick={() => loadActiveRequests(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sección de Solicitudes Recibidas Inactivas */}
      <div className="inactive-requests">
        <h4 className="text-white">Rejected, Completed or Cancelled Requests</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Requester</th>
                <th>Service</th>
                <th>Status</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {inactiveRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.requesterName}</td>
                  <td>{req.serviceName}</td>
                  <td>{req.status}</td>
                  <td>{req.additionalComment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {inactiveTotalPages > 1 && (
          <div className="text-center mt-4">
            {[...Array(inactiveTotalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm mx-1 ${i === inactivePage ? "btn-light" : "btn-outline-light"}`}
                onClick={() => loadInactiveRequests(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
