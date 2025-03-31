import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import Swal from "sweetalert2";

export default function ChatPage() {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChat = async () => {
      const userId = store.user?.id;
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "No autenticado",
          text: "Por favor, inicia sesión.",
        });
        navigate("/login");
        return;
      }
      const result = await actions.getChat(chatId, userId);
      if (result.success) {
        setChat(result.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
        });
      }
      setLoading(false);
    };
    loadChat();
  }, [chatId, store.user, actions, navigate]);

  if (loading) {
    return <p className="text-white text-center">Cargando chat...</p>;
  }

  if (!chat) {
    return <p className="text-white text-center">Chat no encontrado.</p>;
  }

  // Determina si el usuario actual es el requester o el provider
  const isRequester = store.user.id === chat.requesterId;
  const otherUserName = isRequester ? chat.providerName : chat.requesterName;
  const otherUserPhoto = isRequester ? chat.providerPhoto : chat.requesterPhoto;

  return (
    <div className="container py-4 text-white">
      <main className="my-4">
        <div className="container">
          <div className="row justify-content-center g-4">
            {/* Card del servicio */}
            <div className="col-12 col-md-6 col-lg-5" id="contenido-servicio">
              <div className="card shadow h-100">
                <img
                  src={chat.serviceImageUrl || "/img/work.jpg"}
                  alt="Imagen del servicio"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{chat.serviceName}</h5>
                  <p className="card-text">
                    {chat.serviceDescription || "Descripción no disponible."}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <a href={`/service/details/${chat.serviceId}`} className="btn btn-primary">
                    Ver servicio
                  </a>
                </div>
              </div>
            </div>

            {/* Chat */}
            <div className="col-12 col-md-6 col-lg-5" id="contenido-chat">
              <div className="card shadow bg-dark d-flex flex-column h-100">
                <div className="card-header d-flex align-items-center text-white">
                  <img
                    src={otherUserPhoto || "/img/user.png"}
                    alt={otherUserName}
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <h6 className="mb-0">{otherUserName}</h6>
                    <small>{isRequester ? "Proveedor" : "Solicitante"}</small>
                  </div>
                </div>

                <div
                  className="card-body flex-grow-1 p-3 overflow-auto chat-box-bg"
                  id="chat-box"
                  style={{ minHeight: "200px", maxHeight: "400px" }}
                >
                  {chat.messages && chat.messages.length > 0 ? (
                    chat.messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-2 ${
                          message.from === store.user.id ? "text-end" : "text-start"
                        }`}
                      >
                        <span className="badge bg-secondary">{message.text}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No hay mensajes aún.</p>
                  )}
                </div>

                <div className="card-footer p-0">
                  <form
                    className="d-flex align-items-center gap-2"
                    id="mensaje-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Aquí iría lógica para enviar el mensaje
                      Swal.fire({
                        icon: "info",
                        title: "Funcionalidad pendiente",
                        text: "Enviar mensajes en tiempo real.",
                        confirmButtonColor: "#3085d6",
                      });
                    }}
                  >
                    <input type="hidden" id="chatId" value={chat.id} />
                    <input type="hidden" id="usuarioId" value={store.user.id} />
                    <input
                      type="hidden"
                      id="nombreUsuario"
                      value={`${store.user.firstName} ${store.user.lastName}`}
                    />

                    <textarea
                      className="form-control"
                      id="mensaje-input"
                      rows="1"
                      placeholder="Escribe un mensaje..."
                      required
                    ></textarea>

                    <button type="submit" className="btn btn-success">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="text-center mt-4 mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Volver
        </button>
      </div>
    </div>
  );
}
