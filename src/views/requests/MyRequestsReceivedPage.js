// ...imports
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyRequestsReceivedPage() {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  const [activeRequests, setActiveRequests] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [activeTotalPages, setActiveTotalPages] = useState(0);

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

  const handleUpdateStatus = async (id, action) => {
    const result = await actions.updateRequestStatus(id, action);
    if (result.success) {
      alert(result.message);
      loadActiveRequests(activePage);
      loadInactiveRequests(0);
    } else {
      alert("Error: " + result.message);
    }
  };

  const handleChat = async (requestId, chatCreated, chatId) => {
    if (chatCreated && chatId) {
      navigate(`/chat/${chatId}`);
    } else {
      const result = await actions.createChat(store.user.id, requestId);
      if (result.success && result.data?.id) {
        navigate(`/chat/${result.data.id}`);
      } else {
        Swal.fire({
          icon: "info",
          title: "Chat no disponible",
          text: "No se pudo iniciar el chat.",
        });
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">My Received Requests</h2>

      {/* Activas */}
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
                    <a href={`/service/details/${req.serviceId}`} className="servicio-link">
                      {req.serviceName}
                    </a>
                  </td>
                  <td>{req.status}</td>
                  <td>{req.additionalComment}</td>
                  <td>
                    {req.status === "Enviada" && (
                      <>
                        <button className="btn btn-success btn-sm mb-1 me-1"
                          onClick={() => handleUpdateStatus(req.id, "accept")}>
                          Accept
                        </button>
                        <button className="btn btn-danger btn-sm mb-1"
                          onClick={() => handleUpdateStatus(req.id, "reject")}>
                          Reject
                        </button>
                      </>
                    )}
                    {req.status === "Aceptada" && (
                      <button className="btn btn-outline-success btn-sm mb-1"
                        onClick={() => handleUpdateStatus(req.id, "complete")}>
                        Mark as Completed
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${req.chatCreated ? "btn-warning" : "btn-primary"}`}
                      onClick={() => handleChat(req.id, req.chatCreated, req.chatId)}
                    >
                      {req.chatCreated ? "Continue Chat" : "Start Chat"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
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

      {/* Inactivas */}
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

        {/* Paginación */}
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
