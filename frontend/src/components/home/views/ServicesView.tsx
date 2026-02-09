import { motion } from "framer-motion";

const categories = [
  "All",
  "Fitness",
  "Beauty",
  "Home Services",
  "Consulting",
  "Education",
];

export default function ServicesView() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
        <p className="text-sm text-gray-500">
          Book services from local professionals
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-1.5 rounded-full text-sm
                       bg-white border border-gray-200
                       hover:border-primary hover:text-primary
                       transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SERVICES GRID (SKELETON) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white border border-gray-200
                       h-[220px] flex items-center justify-center
                       text-gray-400"
          >
            Service card
          </div>
        ))}
      </div>
    </motion.section>
  );
}