import { Star, MapPin } from "lucide-react";

type BusinessCardProps = {
  name: string;
  category: string;
  location: string;
  rating: number;
};

export default function BusinessCard({
  name,
  category,
  location,
  rating,
}: BusinessCardProps) {
  return (
    <div className="rounded-3xl bg-white shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Banner */}
      <div className="h-44 w-full bg-gray-200" />

      {/* Logo */}
      <div className="relative px-5">
        <div className="absolute -top-6 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-primary font-semibold">
          {name.charAt(0)}
        </div>
      </div>

      {/* Content */}
      <div className="pt-8 px-5 pb-5">
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>

        <span className="inline-block mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          {category}
        </span>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>

          <div className="flex items-center gap-1 text-primary font-medium">
            <Star className="w-4 h-4 fill-primary" />
            {rating}
          </div>
        </div>
      </div>
    </div>
  );
}
