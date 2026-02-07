import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import PageContainer from "../layout/PageContainer";
import { Star, MapPin } from "lucide-react";

const businesses = [
  {
    name: "Bloom Florals",
    category: "Flowers",
    location: "Brooklyn, NY",
    rating: 4.9,
    color: "from-rose-300 to-rose-100",
    initial: "B",
  },
  {
    name: "The Cake Studio",
    category: "Bakery",
    location: "Austin, TX",
    rating: 4.8,
    color: "from-amber-300 to-amber-100",
    initial: "T",
  },
  {
    name: "Craft & Co.",
    category: "Handmade",
    location: "Portland, OR",
    rating: 4.7,
    color: "from-sky-300 to-sky-100",
    initial: "C",
  },
  {
    name: "Nomad Coffee",
    category: "Café",
    location: "Denver, CO",
    rating: 4.9,
    color: "from-yellow-300 to-yellow-100",
    initial: "N",
  },
  {
    name: "Petal & Vine",
    category: "Plants",
    location: "Seattle, WA",
    rating: 4.6,
    color: "from-emerald-300 to-emerald-100",
    initial: "P",
  },
];

export default function FeaturedBusinesses() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll hint (runs once)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const timeout = setTimeout(() => {
      el.scrollBy({ left: 40, behavior: "smooth" });
      setTimeout(() => {
        el.scrollBy({ left: -40, behavior: "smooth" });
      }, 400);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative">
      {/* Divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-px
        bg-gradient-to-r from-transparent via-gray-300 to-transparent"
      />

      <PageContainer className="py-20">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Featured Businesses
          </h2>
          <p className="mt-2 text-gray-600">
            Discover popular local businesses loved by the community.
          </p>
        </div>

        {/* Scroll Area */}
        <div className="relative -mx-6 px-6">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory"
          >
            {businesses.map((biz) => (
              <motion.div
                key={biz.name}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative min-w-[320px] snap-start"
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-primary/15 blur-2xl opacity-0 hover:opacity-100 transition -z-10" />

                {/* Card */}
                <div className="relative rounded-3xl bg-white shadow-md hover:shadow-lg transition overflow-hidden">
                  {/* Banner (edge-to-edge) */}
                  <div
                    className={`h-44 w-full bg-gradient-to-br ${biz.color}`}
                  />

                  {/* Logo */}
                  <div className="absolute top-36 left-6 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-primary font-semibold">
                    {biz.initial}
                  </div>

                  {/* Content */}
                  <div className="pt-10 px-5 pb-5">
                    <h3 className="text-base font-semibold text-gray-900">
                      {biz.name}
                    </h3>

                    <span className="inline-block mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {biz.category}
                    </span>

                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {biz.location}
                      </div>

                      <div className="flex items-center gap-1 text-primary font-medium">
                        <Star className="w-4 h-4 fill-primary" />
                        {biz.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
