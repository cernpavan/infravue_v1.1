"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-lg mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Infravue Admin
          </h1>
          <p className="text-white/60">Sign in to access the dashboard</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-8 space-y-6"
        >
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-navy mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-sand/50 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-navy mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-sand/50 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !username || !password}
            className="w-full bg-navy text-white font-semibold py-3 rounded-lg hover:bg-navy/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-white/50 text-sm mt-6">
          Demo credentials: admin / admin
        </p>
      </div>
    </div>
  );
}
