import { Link } from "react-router-dom";
import { Search, ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 select-none">
          <div className="relative w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl -z-10" />
          </div>

          <span className="text-xl font-bold tracking-tight">
            <span className="text-gray-900">socio</span>
            <span className="text-primary">MART</span>
          </span>
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search businesses, products, services"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <Link to="/explore" className="text-sm font-medium text-gray-700 hover:text-primary">
            Explore
          </Link>
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary">
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-rose-600 transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}
