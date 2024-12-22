import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeCard from "./components/WelcomeCard";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/NavigationBar"; // Import the Navbar component

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-wrap w-full h-full justify-center content-center">
        <Routes>
          <Route path="/" element={<WelcomeCard />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
