import React from "react";
import CarouselServices from "../../components/carrusel/CarruselService";
import ServiceFilter from "../../components/offcanvas/ServiceFilter";


export default function ServicesPage() {
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
  
          <h1 className="text-center mb-4">Services by Category</h1>
  
          {/* Carousel per category */}
          <CarouselServices />
        </main>
      </div>
    );
  }
  
