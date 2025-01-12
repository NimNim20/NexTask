import { Link } from "react-router-dom";
import { User } from "firebase/auth";

interface NavbarProps {
  user?: User | null;
}

function Navbar({ user }: NavbarProps) {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          NexTask
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-300">Home</Link>
          <Link to="/projects" className="text-white hover:text-blue-300">Projects</Link>
          <Link to="/teams" className="text-white hover:text-blue-300">Teams</Link>
          {user ? (
            <Link to="/profile" className="text-white hover:text-blue-300">Profile</Link>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
