import { useState } from "react";
import { registerUser } from "../mockApi"; // Import the mock API function

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation check to ensure passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate registration using the mock API
    const result = registerUser(email, password);

    // Handle the result of registration
    if (result === "Registration successful!") {
      setSuccessMessage(result);
      setError(null);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setError(result);
      setSuccessMessage(null);
    }
  };

  return (
    <section className="flex justify-center items-center h-full py-6">
      <div className="bg-white shadow-sm border border-slate-200 rounded-lg p-6 w-full sm:w-96">
        <h2 className="text-3xl text-center text-slate-800 mb-6">Register to NexTask</h2>

        {/* Display success or error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 mt-2 px-3 border border-slate-300 rounded-md"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-lime-500 rounded-lg text-white font-semibold"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            Already have an account? <a href="/login" className="text-lime-500">Login here</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
