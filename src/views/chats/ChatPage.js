import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import Swal from "sweetalert2";
import { db } from "../../firebase";
import ServiceCard from "../../components/cards/ServiceCard";

export default function ChatPage() {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const chatEndRef = useRef(null);

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
        const chatData = result.data;

        // Cargar mensajes antiguos
        const mensajesRef = db.ref(`chats/${chatId}/mensajes`);
        mensajesRef.once("value", (snapshot) => {
          const mensajes = [];
          snapshot.forEach((snap) => {
            mensajes.push(snap.val());
          });
          chatData.messages = mensajes;
          setChat(chatData);
          setLoading(false);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message,
        });
      }
    };

    loadChat();
  }, [chatId, store.user, actions, navigate]);

  useEffect(() => {
    if (!chatId || !store.user) return;

    const mensajesRef = db.ref(`chats/${chatId}/mensajes`);

    const listener = mensajesRef.on("child_added", (snapshot) => {
      const nuevoMensaje = snapshot.val();
      setChat((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...(prev.messages || []), nuevoMensaje],
        };
      });
    });

    return () => {
      mensajesRef.off("child_added", listener);
    };
  }, [chatId, store.user]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages]);

  const handleSendMessage = async (e, forceValue = null) => {
    e.preventDefault();
    const mensajeInput = document.getElementById("mensaje-input");
    const contenido = (
      forceValue !== null ? forceValue : mensajeInput.value
    ).trim();
    if (!contenido) return;

    const nuevoMensaje = {
      content: contenido,
      userId: store.user.id,
      userName: `${store.user.firstName} ${store.user.lastName}`,
      createdAt: new Date().toISOString(),
    };

    try {
      setEnviando(true);
      const mensajesRef = db.ref(`chats/${chatId}/mensajes`);
      await mensajesRef.push(nuevoMensaje);
      mensajeInput.value = "";
      mensajeInput.style.height = "auto";
    } catch (error) {
      console.error("❌ Error al enviar mensaje:", error);
      Swal.fire("Error", "No se pudo enviar el mensaje", "error");
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return <p className="text-center text-white">Cargando...</p>;
  }

  if (!chat) {
    return <p className="text-white text-center">Chat no encontrado.</p>;
  }

  const isRequester = store.user.id === chat.requesterId;
  const otherUserName = isRequester ? chat.providerName : chat.requesterName;
  const otherUserPhoto = isRequester ? chat.providerPhoto : chat.requesterPhoto;

  return (
    <div className="container py-4 text-white">
      <main className="my-4">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-12 col-md-6 col-lg-5" id="contenido-servicio">
              <ServiceCard
                service={{
                  id: chat.serviceId,
                  name: chat.serviceName,
                  description: chat.serviceDescription,
                  imageUrl: chat.serviceImageUrl || "/img/work.jpg",
                  userFullName: isRequester
                    ? chat.providerName
                    : chat.requesterName,
                  user: {
                    firstName: isRequester
                      ? chat.providerName?.split(" ")[0]
                      : chat.requesterName?.split(" ")[0],
                  },
                  price: chat.servicePrice ?? 0,
                }}
              />
            </div>

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
                    <>
                      {chat.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`message ${
                            message.userId === store.user.id
                              ? "sent"
                              : "received"
                          }`}
                        >
                          {message.userId !== store.user.id && (
                            <span className="nombre-usuario">
                              {message.userName}
                            </span>
                          )}
                          <span>{message.content}</span>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </>
                  ) : (
                    <p className="text-center">No hay mensajes aún.</p>
                  )}
                </div>

                <div className="card-footer p-0">
                  <form
                    className="d-flex align-items-center gap-2"
                    id="mensaje-form"
                    onSubmit={handleSendMessage}
                  >
                    <textarea
                      className="form-control"
                      id="mensaje-input"
                      rows="1"
                      placeholder="Escribe un mensaje..."
                      required
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          const texto = e.target.value;
                          handleSendMessage(e, texto);
                        }
                      }}
                    ></textarea>

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={enviando}
                    >
                      <i className="bi bi-send-fill"></i>
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
