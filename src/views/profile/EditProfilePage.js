import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditProfilePage() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const user = store.user;

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    city: user?.city || "",
    phone: user?.phone || "",
    profileImageFile: null,
    profileImage: user?.profileImage || "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "No autenticado",
        text: "Inicia sesión para editar tu perfil.",
      });
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImageFile: file }));
      const reader = new FileReader();
      reader.onload = (event) => setPreviewUrl(event.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const confirmed = await Swal.fire({
      title: "¿Guardar cambios?",
      text: "Tu perfil será actualizado con la nueva información.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    });
  
    if (!confirmed.isConfirmed) return;
  
    const dataToSend = new FormData();
    dataToSend.append("firstName", formData.firstName);
    dataToSend.append("lastName", formData.lastName);
    dataToSend.append("city", formData.city);
    dataToSend.append("phone", formData.phone);
    if (formData.profileImageFile) {
      dataToSend.append("profileImageFile", formData.profileImageFile);
    }
  
    const result = await actions.updateProfile(dataToSend);
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Perfil actualizado",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/profile");
    } else {
      Swal.fire("Error", result.message, "error");
    }
  };
  

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-dark border-light p-4">
            <h2 className="text-center text-white mb-4">Editar Perfil</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Imagen actual</label>
                <br />
                <img
                  src={formData.profileImage}
                  alt="Imagen actual"
                  className="img-thumbnail"
                  style={{ maxWidth: "200px" }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nueva imagen (opcional)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    className="img-thumbnail mt-2"
                    style={{ maxWidth: "200px" }}
                    alt="Vista previa"
                  />
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
