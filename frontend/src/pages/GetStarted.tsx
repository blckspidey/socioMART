import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Store,
  User,
  Mail,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";

type Role = "customer" | "seller";

export default function GetStarted() {
  const [role, setRole] = useState<Role>("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ MUST be outside JSX
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      login(res.data.user, res.data.token);
      navigate("/explore");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-start justify-center pt-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8 py-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 select-none mb-6">
          <div className="relative w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl -z-10" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            <span className="text-gray-900">socio</span>
            <span className="text-primary">MART</span>
          </span>
        </Link>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-gray-900 text-center">
          Get Started
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-center">
          Create your SocioMart account
        </p>

        {/* Role Selection */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`rounded-2xl border p-4 text-left transition
              ${
                role === "customer"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary hover:bg-gray-50"
              }`}
          >
            <ShoppingBag className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-semibold">Customer</p>
            <p className="text-xs text-gray-600">
              Discover and shop local.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRole("seller")}
            className={`rounded-2xl border p-4 text-left transition
              ${
                role === "seller"
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary hover:bg-gray-50"
              }`}
          >
            <Store className="w-5 h-5 text-primary mb-2" />
            <p className="text-sm font-semibold">Seller</p>
            <p className="text-xs text-gray-600">
              Sell, explore & buy.
            </p>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                         focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                         focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                         focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-white font-medium
                       hover:bg-rose-600 hover:-translate-y-[1px]
                       transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
