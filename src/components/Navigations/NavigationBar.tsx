import { Link } from "react-router-dom";

function Navbar() {
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
          <Link to="/projects" className="text-white hover:text-blue-300">Projects</Link>
          <Link to="/teams" className="text-white hover:text-blue-300">Teams</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
