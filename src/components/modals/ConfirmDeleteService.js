import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../../store/context";
import Swal from "sweetalert2";

export default function ConfirmDeleteService({ show, onClose, serviceId }) {
  const { actions } = useContext(Context);
  const [input, setInput] = useState("");

  const handleConfirm = async () => {
    if (input.trim().toLowerCase() !== "quiero borrar mi servicio") {
      Swal.fire({
        icon: "error",
        title: "Frase incorrecta",
        text: "Debes escribir: 'quiero borrar mi servicio'",
        confirmButtonColor: "#d33",
        background: "#1e1e1e",
        color: "#fff",
      });
      return;
    }

    const result = await actions.deleteService(serviceId);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El servicio fue eliminado correctamente.",
        confirmButtonColor: "#198754",
        background: "#1e1e1e",
        color: "#fff",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message || "No se pudo eliminar el servicio.",
        confirmButtonColor: "#d33",
        background: "#1e1e1e",
        color: "#fff",
      });
    }

    setInput(""); // Limpiar input
    onClose(); // Cerrar modal
  };

  const handleClose = () => {
    setInput("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>¿Estás seguro?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <p>
          Esta acción <strong>no se puede deshacer</strong>. Para confirmar,
          escribe: <span className="text-warning fw-bold">quiero borrar mi servicio</span>
        </p>
        <Form.Control
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Escribe "quiero borrar mi servicio"'
          className="mt-3"
        />
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirmar eliminación
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
