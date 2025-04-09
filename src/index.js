import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

// Importaciones de estilo y bibliotecas
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "react-toastify/dist/ReactToastify.css"; //  Importar CSS de Toastify
import "./assets/css/global.css";
import "react-confirm-alert/src/react-confirm-alert.css";


//  Componentes principales
import App from "./App";
import { ToastContainer } from "react-toastify"; // Importar el contenedor

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <App />
        <ToastContainer /> {/* Esto permite mostrar los toasts en cualquier parte de la app */}
      </>
    </Provider>
  </React.StrictMode>
);
