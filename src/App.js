import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import NavigationBar from "./components/layout/NavigationBar";
import injectContext from "./store/context";
import LoginPage from "./views/login/LoginPage";
import HomePage from "./views/home/HomePage";
import ProfilePage from "./views/profile/ProfilePage";
import ServicesPage from "./views/services/ServicesPage";
import MyServicesPage from "./views/services/MyServicesPage";
import ProfileServicePage from "./views/services/ProfileServicePage";
import EditServicePage from "./views/services/EditServicePage";
import PostServicePage from "./views/services/PostServicePage";


function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/my-services" element={<MyServicesPage />} />
            <Route path="/service/details/:id" element={<ProfileServicePage />} />
            <Route path="/service/edit/:id" element={<EditServicePage />} />
            <Route path="/post-service/" element={<PostServicePage />} />


          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default injectContext(App);
