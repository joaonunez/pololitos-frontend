import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import pololitosLogoBlack from "../../assets/img/pololitos-logo-black.png"
export default function LoginPage() {
  return (
    <div className="body-with-bg">
      <div className="login-wrapper container mb-3">
        <div className="row w-100">
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <img
              src={pololitosLogoBlack}
              alt="Logo pololitos"
              className="img-logo"
              style={{ maxWidth: "400px" }}
            />
          </div>
          <div className="col-lg-6">
            <div className="login-container">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>

              <LoginForm />

              <button className="btn btn-google mt-3">
                <img
                  src="https://res.cloudinary.com/dwz4chwv7/image/upload/v1742869751/google_yqrlgh.png"
                  alt="Google Logo"
                />
                Acceder con Google
              </button>

              <p className="text-center mt-3">
                ¿No tienes una cuenta?{" "}
                <a href="/registro" className="text-warning">
                  Regístrate
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
