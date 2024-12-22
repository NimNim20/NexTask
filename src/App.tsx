import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeCard from "./components/WelcomeCard";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import TeamsPage from "./components/pages/TeamsPage";
import Navbar from "./components/NavigationBar"; 
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const isAuthenticated = false;

  return (
    <Router>
      <Navbar />
      <div className="flex flex-wrap w-full h-full justify-center content-center">
        <Routes>
          <Route path="/" element={<WelcomeCard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/teams" element={<TeamsPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
