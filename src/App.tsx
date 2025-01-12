import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeCard from "./components/WelcomeCard";
import Navbar from "./components/Navigations/NavigationBar";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import { getAuth } from "firebase/auth"; 

function App() {
  const auth = getAuth();
  const user = auth.currentUser; 

  return (
    <Router>
      {user ? ( 
        <Navbar user={user} />
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<WelcomeCard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
