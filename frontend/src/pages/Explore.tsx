import { useMemo, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import ExploreFilters from "../components/explore/ExploreFilters";
import BusinessCard from "../components/cards/BusinessCard";
import type { Category } from "../types/category";

type Business = {
  name: string;
  category: Category;
  location: string;
  rating: number;
};

const businesses: Business[] = [
  {
    name: "Bloom Florals",
    category: "art",
    location: "Brooklyn, NY",
    rating: 4.9,
  },
  {
    name: "The Cake Studio",
    category: "food",
    location: "Austin, TX",
    rating: 4.8,
  },
  {
    name: "Glow Salon",
    category: "beauty",
    location: "Los Angeles, CA",
    rating: 4.6,
  },
  {
    name: "FitLife Gym",
    category: "fitness",
    location: "Chicago, IL",
    rating: 4.8,
  },
  {
    name: "Craft & Co.",
    category: "fashion",
    location: "Portland, OR",
    rating: 4.7,
  },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<Category | "all">("all");

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((biz) => {
      const matchesSearch = biz.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || biz.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <PageContainer className="pt-6 pb-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Explore
        </h1>
        <p className="mt-2 text-gray-600">
          Discover local businesses, products, and services.
        </p>
      </div>

      {/* Filters */}
      <ExploreFilters
        search={search}
        onSearchChange={setSearch}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className="mt-20 text-center text-gray-500">
          No businesses found.
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBusinesses.map((biz) => (
            <BusinessCard key={biz.name} {...biz} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
