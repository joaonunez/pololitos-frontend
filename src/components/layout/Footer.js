export default function Footer() {
  return (
    <>
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-1">Pololitos &copy; 2025. Todos los derechos reservados</p>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link text-white" href="/contacto">
              Contacto
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/nosotros">
              Nosotros
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
