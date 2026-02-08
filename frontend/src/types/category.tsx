export type Category =
  | "fashion"
  | "food"
  | "beauty"
  | "electronics"
  | "home"
  | "fitness"
  | "art"
  | "services";

export const CATEGORY_LABELS: Record<Category | "all", string> = {
  all: "All",
  fashion: "Fashion",
  food: "Food",
  beauty: "Beauty",
  electronics: "Electronics",
  home: "Home",
  fitness: "Fitness",
  art: "Art",
  services: "Services",
};
