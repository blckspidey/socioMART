export default function ProductsView() {
  return (
    <section className="h-full flex flex-col gap-6">

      {/* TOP FILTER BAR */}
      <div className="flex flex-col gap-4">

        {/* Location Filter */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Location"
            className="
              px-4 py-2 rounded-full
              border border-gray-200
              text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/30
            "
          />

          <span className="text-sm text-gray-500">
            Showing products near you
          </span>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            "All",
            "Fashion",
            "Fitness",
            "Skincare",
            "Grocery",
            "Food",
            "Electronics",
          ].map((category) => (
            <button
              key={category}
              className="
                shrink-0
                px-4 py-1.5
                rounded-full
                border border-gray-200
                text-sm
                text-gray-700
                hover:border-primary hover:text-primary
                transition
              "
            >
              {category}
            </button>
          ))}
        </div>

      </div>

      {/* PRODUCTS GRID */}
      <div className="flex-1 overflow-y-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* PLACEHOLDER CARDS */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="
                h-64
                rounded-2xl
                border border-dashed border-gray-300
                flex items-center justify-center
                text-gray-400
              "
            >
              Product Card
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}
