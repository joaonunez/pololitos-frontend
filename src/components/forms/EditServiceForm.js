import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../../store/context";

export default function EditServiceForm({ service, categories }) {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    city: "",
    categoryId: "",
    image: null,
    previewImage: null,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
        city: service.city || "",
        categoryId: service.categoryId || "",
        image: null,
        previewImage: service.imageUrl || null,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    formPayload.append("price", formData.price);
    formPayload.append("city", formData.city);
    formPayload.append("category.id", formData.categoryId);
    if (formData.image) {
      formPayload.append("image", formData.image);
    }

    const response = await actions.updateService(service.id, formPayload);

    if (response.success) {
      navigate("/my-services", { state: { updated: true }, replace: true });
    } else {
      alert("Error al actualizar el servicio: " + response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          name="description"
          className="form-control"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          step="1"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Ciudad</label>
        <input
          type="text"
          name="city"
          className="form-control"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select
          name="categoryId"
          className="form-select"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {formData.previewImage && (
        <div className="mb-3">
          <label className="form-label">Imagen actual / Vista previa:</label>
          <img
            src={formData.previewImage}
            alt="Vista previa"
            className="img-fluid rounded"
            style={{ maxHeight: "200px" }}
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Nueva imagen (opcional)</label>
        <input
          type="file"
          name="image"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary me-2 mb-3">
          Actualizar Servicio
        </button>
        <a href="/my-services" className="btn btn-secondary">
          Volver
        </a>
      </div>
    </form>
  );
}
