import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeCard from "./components/WelcomeCard";
import Navbar from "./components/Navigations/NavigationBar";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomeCard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </Router>
  );
}

export default App;
