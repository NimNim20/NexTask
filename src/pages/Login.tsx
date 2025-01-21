import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Reset error before submitting new login attempt
        setError("");
        setIsLoading(true); // Show loading spinner

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in:", userCredential.user); // Log user details
            navigate("/"); // Redirect to the homepage or dashboard
        } catch (error: unknown) {
            setIsLoading(false); // Hide loading spinner when error occurs
            if (error instanceof Error && "code" in error) {
                const firebaseError = error as { code: string; message: string };
                console.error("Login error:", firebaseError.code, firebaseError.message);

                // Show specific error message based on Firebase error code
                if (firebaseError.code === "auth/user-not-found") {
                    setError("No account found with this email.");
                } else if (firebaseError.code === "auth/wrong-password") {
                    setError("Incorrect password. Please try again.");
                } else {
                    setError("Failed to log in. Please try again later.");
                }
            } else {
                console.error("An unknown error occurred.");
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded p-2"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
