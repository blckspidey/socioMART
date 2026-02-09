import { motion } from "framer-motion";

export default function BusinessesView() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Businesses
        </h1>
        <p className="text-sm text-gray-500">
          Discover local brands and creators
        </p>
      </div>

      {/* BUSINESS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-gray-200
                       overflow-hidden hover:shadow-lg transition"
          >
            {/* IMAGE PLACEHOLDER */}
            <div className="h-40 bg-gradient-to-br from-rose-100 to-rose-200" />

            {/* CONTENT */}
            <div className="p-4 space-y-1">
              <p className="font-semibold text-gray-900">
                Business Name
              </p>
              <p className="text-sm text-gray-500">
                Category · Location
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}