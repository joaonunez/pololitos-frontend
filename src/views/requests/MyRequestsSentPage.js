import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyRequestsSentPage() {
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
    const data = await actions.getMySentActiveRequests(page, 2);
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
    const data = await actions.getMySentInactiveRequests(page, 2);
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

  const handleCancel = async (id) => {
    const result = await actions.updateRequestStatus(id, "cancel");
    if (result.success) {
      alert(result.message);
      loadActiveRequests(activePage);
      loadInactiveRequests(0);
    } else {
      alert("Error al cancelar solicitud: " + result.message);
    }
  };

  const handleChat = async (req) => {
    if (req.chatCreated && req.chatId) {
      navigate(`/chat/${req.chatId}`);
    } else {
      const result = await actions.createChat(store.user.id, req.id);
      if (result.success && result.data?.id) {
        navigate(`/chat/${result.data.id}`);
      } else {
        Swal.fire({
          icon: "info",
          title: "Chat no disponible",
          text: "No se pudo iniciar el chat.",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };
  

  const requesterName =
    store.user?.firstName && store.user?.lastName
      ? `${store.user.firstName} ${store.user.lastName}`
      : "N/A";

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">My Sent Requests</h2>

      <div className="active-requests mb-5">
        <h4 className="text-warning">Active Requests</h4>
        <div className="table-responsive">
          <table className="table table-dark table-bordered table-hover text-center align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Provider</th>
                <th>Service</th>
                <th>Status</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.providerName}</td>
                  <td>
                    <a href={`/service/details/${req.serviceId}`} className="servicio-link">
                      {req.serviceName}
                    </a>
                  </td>
                  <td>{req.status}</td>
                  <td>{req.additionalComment}</td>
                  <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm mb-1" onClick={() => handleCancel(req.id)}>
                      Cancel
                    </button>
                    <button
                      className={`btn btn-sm ms-1 ${req.chatCreated ? "btn-warning" : "btn-secondary"}`}
                      onClick={() => handleChat(req)}
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

      <div className="inactive-requests">
        <h4 className="text-white">Rejected or Completed Requests</h4>
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
                  <td>{requesterName}</td>
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
