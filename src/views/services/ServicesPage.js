import React, { useEffect, useState, useContext } from "react";
import CarouselServices from "../../components/carrusel/CarouselServices";
import ServiceFilter from "../../components/offcanvas/ServiceFilter";
import { Context } from "../../store/context";

export default function ServicesPage() {
  const { actions } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCategories = await actions.getCategoryService();
      const fetchedServices = await actions.getPublicServices();
      setCategories(fetchedCategories || []);
      setServices(fetchedServices || []);
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column">
      <main className="container py-5">
        {/* Filter button */}
        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-outline-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasFilter"
          >
            <i className="bi bi-funnel"></i> Filters
          </button>
        </div>

        {/* Filter sidebar */}
        <ServiceFilter />

        <h1 className="text-center mb-4">Servicios</h1>

        {/* Carousel per category */}
        {categories.map((category) => {
          const servicesByCategory = services.filter(
            (s) => s.categoryId === category.id
            
          );

          return (
            <CarouselServices
              key={category.id}
              categoryName={category.name}
              services={servicesByCategory}
            />
          );
        })}
      </main>
    </div>
  );
}
