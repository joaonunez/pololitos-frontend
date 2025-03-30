import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";

export default function PostServiceForm({ categories }) {
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

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("city", formData.city);
    payload.append("category.id", formData.categoryId);
    if (formData.image) payload.append("file", formData.image); // usa "file" como en el backend

    const response = await actions.createService(payload);

    if (response.success) {
      navigate("/my-services", { state: { created: true } });
    } else {
      alert("Error al publicar servicio: " + response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mb-3">
        <label className="form-label">Nombre del Servicio:</label>
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
        <label className="form-label">Descripción:</label>
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
        <label className="form-label">Precio:</label>
        <input
          type="number"
          name="price"
          className="form-control"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Ciudad:</label>
        <input
          type="text"
          name="city"
          className="form-control"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Foto del Servicio:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="form-control"
          onChange={handleImageChange}
          required
        />
        {formData.previewImage && (
          <div className="mt-3 text-center">
            <img
              src={formData.previewImage}
              alt="Vista previa"
              className="img-thumbnail"
              style={{ maxWidth: "300px" }}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label">Categoría:</label>
        <select
          name="categoryId"
          className="form-control"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-success btn-lg px-5">
          <i className="bi bi-cloud-upload"></i> Publicar Servicio
        </button>
      </div>
    </form>
  );
}
