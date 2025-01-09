import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeCard from "./components/WelcomeCard";
import Navbar from "./components/NavigationBar";
import Projects from "./pages/Projects"; // Import your Projects component
import Teams from "./pages/Teams"; // Import your Teams component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomeCard />} />
        <Route path="/projects" element={<Projects />} /> {/* Add Projects route */}
        <Route path="/teams" element={<Teams />} /> {/* Add Teams route */}
      </Routes>
    </Router>
  );
}

export default App;
