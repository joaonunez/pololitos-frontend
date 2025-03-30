import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditServiceForm from "../../components/forms/EditServiceForm";
import { Context } from "../../store/context";

export default function EditServicePage() {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = store.user;

      if (!user) {
        navigate("/login");
        return;
      }

      const allServices = await actions.getPublicServices();
      const allCategories = await actions.getCategoryService();

      if (!store.services) return; // Esperá a que se carguen primero

      const foundService = store.services.find((s) => s.id === parseInt(id));
      if (!foundService) {
        navigate("/");
        return;
      }

      // Validar si el usuario actual es el autor
      const isAuthor =
        `${user.firstName} ${user.lastName}` === foundService.userFullName;

      if (!isAuthor) {
        navigate("/");
        return;
      }

      setService(foundService);
      setCategories(allCategories || []);
    };

    fetchData();
  }, [id, store.user, actions, navigate]);

  if (!service) {
    return <p className="text-white text-center">Cargando servicio...</p>;
  }

  return (
    <main className="container my-5 text-white">
      <div className="bg-dark p-5 rounded shadow col-12 col-md-8 col-lg-6 mx-auto">
        <h1 className="mb-4 text-center">Editar Servicio</h1>
        <EditServiceForm service={service} categories={categories} />
      </div>
    </main>
  );
}
