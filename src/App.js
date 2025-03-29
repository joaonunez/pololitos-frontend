import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import NavigationBar from "./components/layout/NavigationBar";
import injectContext from "./store/context";
import LoginPage from "./views/login/LoginPage";
import HomePage from "./views/home/HomePage";





function App() {
  return (
    <BrowserRouter>
      <NavigationBar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default injectContext(App);
