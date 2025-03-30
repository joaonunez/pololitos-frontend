import { useContext } from "react";
import { Context } from "../../store/context";
import { Link, useNavigate } from "react-router-dom";
import pololitosLogoWhite from '../../assets/img/pololitos-logo-white.png';
import defaultProfileImage from '../../assets/img/default-profile-image.png';

export default function NavigationBar() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { user } = store;

  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        <img src={pololitosLogoWhite} alt="Logo pololitos" height="40" />
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 container-fluid">
          <li className="nav-item"><Link className="nav-link" to="/services">Servicios</Link></li>
          {user && (
            <>
              <li className="nav-item"><Link className="nav-link" to="/my-services">Mis Servicios</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/my-requests-sent">Enviadas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/my-requests-received">Recibidas</Link></li>
            </>
          )}
        </ul>

        <div className="d-lg-flex w-100 justify-content-end align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2">
            <form className="d-flex" action="/buscar-servicios" method="get">
              <input className="form-control me-2" type="search" name="query" placeholder="Buscar" />
              <button className="btn btn-outline-light" type="submit"><i className="bi bi-search"></i></button>
            </form>

            {user && (
              <div className="dropdown">
                <button className="btn btn-outline-light position-relative" data-bs-toggle="dropdown">
                  <i className="bi bi-bell-fill"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    0
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark text-white" style={{ width: '300px', maxHeight: '400px', overflowY: 'auto' }}>
                  <li className="dropdown-item text-white small text-wrap text-break">
                    Cargando notificaciones...
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline-light">Iniciar sesión</Link>
                <Link to="/registro" className="btn btn-outline-info">Regístrate</Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <img src={user.profileImage || defaultProfileImage} alt="Perfil" width="40" height="40" className="rounded-circle" />
                </Link>
                <Link to="/post-service" className="btn btn-success">Crear Servicio</Link>
                <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
