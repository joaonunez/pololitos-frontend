import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import PostServiceForm from "../../components/forms/PostServiceForm";

export default function PostServicePage() {
  const { store, actions } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!store.user) {
        navigate("/login");
        return;
      }

      const allCategories = await actions.getCategoryService();
      setCategories(allCategories || []);
    };

    fetchData();
  }, [store.user, actions, navigate]);

  return (
    <main className="container my-5 text-white">
      <div className="bg-dark p-5 rounded shadow col-12 col-md-8 col-lg-6 mx-auto">
        <h1 className="mb-4 text-center">Publicar Servicio</h1>
        <PostServiceForm categories={categories} />
      </div>
    </main>
  );
}
