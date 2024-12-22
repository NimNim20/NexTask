import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <section className="LoginPage flex flex-col justify-center items-center w-full h-full py-6">
      <div className="bg-white shadow-sm border border-slate-200 rounded-lg w-full sm:w-96 p-6">
        <h2 className="text-3xl text-center text-slate-800 mb-6">Login to NexTask</h2>
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
          <button type="submit" className="w-full h-12 bg-lime-500 rounded-lg text-white font-semibold">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account? <a href="/signup" className="text-lime-500">Sign up</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
