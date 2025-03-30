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

      const allCategories = await actions.getCategoryService();
      const fetchedService = await actions.getServiceById(id);

      if (!fetchedService) {
        navigate("/");
        return;
      }

      // Validar si el usuario actual es el autor del servicio
      const isAuthor = user.id === fetchedService.userId;


      if (!isAuthor) {
        navigate("/");
        return;
      }

      setService(fetchedService);
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
