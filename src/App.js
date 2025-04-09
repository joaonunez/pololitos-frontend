import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import NavigationBar from "./components/layout/NavigationBar";
import LoginPage from "./views/login/LoginPage";
import HomePage from "./views/home/HomePage";
import ProfilePage from "./views/profile/ProfilePage";
import ServicesPage from "./views/services/ServicesPage";
import MyServicesPage from "./views/services/MyServicesPage";
import ProfileServicePage from "./views/services/ProfileServicePage";
import EditServicePage from "./views/services/EditServicePage";
import PostServicePage from "./views/services/PostServicePage";
import MyRequestsSentPage from "./views/requests/MyRequestsSentPage";
import MyRequestsReceivedPage from "./views/requests/MyRequestsReceivedPage";
import ChatPage from "./views/chats/ChatPage";
import EditProfilePage from "./views/profile/EditProfilePage";
import SearchServiceResultsPage from "./views/services/SearchServiceResultsPage";

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
            <Route path="/my-requests-sent/" element={<MyRequestsSentPage />} />
            <Route path="/my-requests-received/" element={<MyRequestsReceivedPage />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/search-results" element={<SearchServiceResultsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
