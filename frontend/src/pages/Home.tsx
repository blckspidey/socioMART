import { useState } from "react";
import Sidebar from "../components/home/Sidebar";

import ProductsView from "../components/home/views/ProductsView";
import ServicesView from "../components/home/views/ServicesView";
import BusinessesView from "../components/home/views/BusinessesView";

/**
 * All possible views inside Home
 * (single source of truth)
 */
export type HomeView =
  | "products"
  | "services"
  | "businesses"
  | "cart"
  | "orders"
  | "settings"
  | "profile";

export default function Home() {
  // Controls which view is visible
  const [activeView, setActiveView] = useState<HomeView>("products");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 relative">
      {/* SIDEBAR */}
      <Sidebar
        activeView={activeView}
        onChange={setActiveView}
      />

      {/* MAIN CONTENT
          - Starts after collapsed sidebar
          - Expanded sidebar overlays content */}
      <main className="p-6 ml-[72px]">
        {activeView === "products" && <ProductsView />}
        {activeView === "services" && <ServicesView />}
        {activeView === "businesses" && <BusinessesView />}

        {activeView === "cart" && (
          <div className="text-gray-600 text-lg">Cart view coming soon</div>
        )}

        {activeView === "orders" && (
          <div className="text-gray-600 text-lg">Orders view coming soon</div>
        )}

        {activeView === "settings" && (
          <div className="text-gray-600 text-lg">Settings view coming soon</div>
        )}

        {activeView === "profile" && (
          <div className="text-gray-600 text-lg">My Profile view coming soon</div>
        )}
      </main>
    </div>
  );
}
