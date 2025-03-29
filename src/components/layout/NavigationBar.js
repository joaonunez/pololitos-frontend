import pololitosLogoWhite from '../../assets/img/pololitos-logo-white.png';
// import defaultProfileImage from '../../assets/img/default-profile-image.png'; // Para cuando uses perfil

export default function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="/">
        <img src={pololitosLogoWhite} alt="Logo pololitos" height="40" />
      </a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 container-fluid">
          <li className="nav-item"><a className="nav-link" href="/servicios">Servicios</a></li>
          {/* Puedes agregar condicional según sesión más adelante */}
          {/* <li className="nav-item"><a className="nav-link" href="/mis-servicios">Mis Servicios</a></li>
          <li className="nav-item"><a className="nav-link" href="/mis-solicitudes-enviadas">Enviadas</a></li>
          <li className="nav-item"><a className="nav-link" href="/mis-solicitudes-recibidas">Recibidas</a></li> */}
        </ul>

        <div className="d-lg-flex w-100 justify-content-end align-items-center flex-wrap gap-3">
          {/* Buscador */}
          <div className="d-flex align-items-center gap-2">
            <form className="d-flex" action="/buscar-servicios" method="get">
              <input className="form-control me-2" type="search" name="query" placeholder="Buscar" />
              <button className="btn btn-outline-light" type="submit"><i className="bi bi-search"></i></button>
            </form>

            {/* Notificaciones (comentadas) */}
            {/*
            <div className="dropdown">
              <button className="btn btn-outline-light position-relative" data-bs-toggle="dropdown">
                <i className="bi bi-bell-fill"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ display: 'none' }}>
                  0
                </span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end bg-dark text-white" style={{ width: '300px', maxHeight: '400px', overflowY: 'auto' }}>
                <li className="dropdown-item text-white small text-wrap text-break">
                  Cargando notificaciones...
                </li>
              </ul>
            </div>
            */}
          </div>

          {/* Botones de sesión */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <a href="/login" className="btn btn-outline-light">Iniciar sesión</a>
            <a href="/registro" className="btn btn-outline-info">Regístrate</a>

            {/* Foto de perfil, crear servicio, cerrar sesión (comentados) */}
            {/*
            <a href="/perfilUsuario">
              <img src={defaultProfileImage} alt="Perfil" width="40" height="40" className="rounded-circle" />
            </a>
            <a href="/servicios/publicar" className="btn btn-success">Crear Servicio</a>
            <a href="/logout" className="btn btn-danger">Cerrar Sesión</a>
            */}
          </div>
        </div>
      </div>
    </nav>
  );
}
