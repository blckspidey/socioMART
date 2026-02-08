import { Search } from "lucide-react";
import type { Category } from "../../types/category";
import { CATEGORY_LABELS } from "../../types/category";

type ExploreFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  activeCategory: Category | "all";
  onCategoryChange: (value: Category | "all") => void;
};

const categories: (Category | "all")[] = [
  "all",
  "fashion",
  "food",
  "beauty",
  "electronics",
  "home",
  "fitness",
  "art",
  "services",
];

export default function ExploreFilters({
  search,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: ExploreFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search businesses"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm
                     focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition whitespace-nowrap
                ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
