import React from "react";

const HomePage = () => {
  // Servicios mock (esto se conecta a backend después)
  const ultimosServicios = [
    {
      id: 1,
      nombre: "Limpieza de jardín",
      imgUrl: "/img/servicio1.jpg",
      ciudad: "Santiago",
      precio: 15000,
      esPropio: false,
    },
    {
      id: 2,
      nombre: "Clases de matemáticas",
      imgUrl: "/img/servicio2.jpg",
      ciudad: "Valparaíso",
      precio: 10000,
      esPropio: true,
    },
  ];

  const moverDerecha = () => {
    document
      .querySelector(".cards-wrapper")
      .scrollBy({ left: 300, behavior: "smooth" });
  };

  const moverIzquierda = () => {
    document
      .querySelector(".cards-wrapper")
      .scrollBy({ left: -300, behavior: "smooth" });
  };

  return (
    <div>
      <main className="container text-center my-5">
        <h1 className="mb-3">
          Publica un Pololo.
          <br />
          Genera Ingresos Con Trabajos Pequeños.
        </h1>
        <p className="lead mb-4">
          Conectamos a personas que buscan ayuda con servicios locales
          dispuestos a brindar soluciones
        </p>
        <a href="/servicios" className="btn btn-primary btn-lg w-auto">
          Buscar Servicios
        </a>

        {/* Video Tutorial */}
        <div className="video-tutorial my-5">
          <h2 className="mb-3">¿No sabes cómo usar Pololitos?</h2>
          <p className="mb-4">
            Mira este video corto donde te explicamos paso a paso cómo buscar,
            publicar y contactar por un pololito.
          </p>
          <div className="ratio ratio-16x9 rounded overflow-hidden shadow">
            <iframe
              src="https://www.youtube.com/embed/KDliA6la4eA"
              title="Cómo usar Pololitos"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Publicidad */}
        <div className="row justify-content-center my-5">
          <div className="col-md-10 bg-dark text-white rounded p-4 d-flex flex-wrap align-items-center">
            <img
              src="/img/work.jpg"
              alt="Publicidad"
              className="img-fluid rounded me-4"
              style={{ maxWidth: "250px" }}
            />
            <div>
              <h2>¡Destaca tu Pololito y Gana Más!</h2>
              <p>
                Haz que más clientes te encuentren y multiplica tus
                oportunidades de ingresos.
              </p>
              <ul>
                <li>Más visibilidad para tu servicio</li>
                <li>Aumenta tus contrataciones</li>
                <li>Invierte poco, gana más</li>
              </ul>
              <a href="/contacto" className="btn btn-warning">
                Solicitar Publicidad
              </a>
            </div>
          </div>
        </div>

        {/* ¿Por qué elegirnos? */}
        <div className="row justify-content-center text-center text-white my-5">
          <h2 className="mb-4">¿Por qué elegir Pololitos?</h2>
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-dark rounded h-100">
              <i className="bi bi-shield-lock-fill display-4 mb-3 text-primary"></i>
              <h5>Seguridad Garantizada</h5>
              <p>
                Protegemos tus datos y transacciones con sistemas seguros y
                monitoreados.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-dark rounded h-100">
              <i className="bi bi-incognito display-4 mb-3 text-warning"></i>
              <h5>Confidencialidad</h5>
              <p>
                Tu privacidad es nuestra prioridad. Nadie más verá tu
                información personal.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-dark rounded h-100">
              <i className="bi bi-chat-dots-fill display-4 mb-3 text-info"></i>
              <h5>Chat Personalizado</h5>
              <p>
                Comunícate en tiempo real con tus clientes o proveedores dentro
                de la plataforma.
              </p>
            </div>
          </div>
        </div>

        {/* Carrusel de servicios */}
        <div className="section mb-5">
          <h2 className="text-center mb-4">
            Nuevos servicios que podrían interesarte
          </h2>
          <div className="carousel-container">
            <button className="carousel-btn prev" onClick={moverIzquierda}>
              &#10094;
            </button>
            <div className="cards-wrapper">
              <div className="cards">
                {/* {ultimosServicios.map(servicio => (
                  <ServicioCard key={servicio.id} servicio={servicio} />
                ))} */}
              </div>
            </div>
            <button className="carousel-btn next" onClick={moverDerecha}>
              &#10095;
            </button>
          </div>
        </div>
      </main>

      {/* Footer si tienes */}
    </div>
  );
};

export default HomePage;
