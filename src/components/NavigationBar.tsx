import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  isAuthenticated: boolean; // Determines if the user is logged in
  onLogout: () => void;     // Function to handle logout
}

function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Update global authentication state
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="text-white text-2xl font-bold">
          NexTask
        </Link>
        {/* Links */}
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-300">Home</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white hover:text-blue-300">Login</Link>
              <Link to="/register" className="text-white hover:text-blue-300">Register</Link>
            </>
          ) : (
            <>
              <Link to="/projects" className="text-white hover:text-blue-300">Projects</Link>
              <Link to="/teams" className="text-white hover:text-blue-300">Teams</Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-300 font-bold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
