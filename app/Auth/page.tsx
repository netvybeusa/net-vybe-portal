"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      // 🔹 Redirect after success
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto text-center">
      {/* Logo */}
      <img src="/logo.png" alt="Net Vybe Logo" className="w-32 mx-auto mb-6" />

      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        {isSignup ? "Sign Up" : "Login"}
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
      >
        {isSignup ? "Create Account" : "Login"}
      </button>

      <p className="mt-4 text-sm">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className="text-indigo-600 underline"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </form>
  );
}