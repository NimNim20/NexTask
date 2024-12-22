import { useState } from "react";
import { loginUser } from "../mockApi"; // Import the mock API function
import { Navigate } from "react-router-dom"; // Import Navigate for redirection

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false); // Track login state

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login using the mock API
    const result = loginUser(email, password);

    if (result === "Login successful!") {
      setSuccessMessage(result);
      setError(null);
      setLoggedIn(true); // Mark the user as logged in
    } else {
      setError(result);
      setSuccessMessage(null);
    }
  };

  if (loggedIn) {
    // If the user is logged in, redirect to the Projects page
    return <Navigate to="/projects" />;
  }

  return (
    <section className="flex justify-center items-center h-full py-6">
      <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-6 w-full sm:w-96">
        <h2 className="text-3xl text-center text-slate-800 mb-6">Login to NexTask</h2>

        {/* Display success or error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 mt-2 px-3 border border-slate-300 rounded-md"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 mt-2 px-3 border border-slate-300 rounded-md"
              placeholder="Your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-lime-500 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
