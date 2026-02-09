import {
  Package,
  Store,
  Briefcase,
  ShoppingCart,
  ClipboardList,
  Settings,
  User,
} from "lucide-react";

type View =
  | "products"
  | "services"
  | "businesses"
  | "cart"
  | "orders"
  | "settings"
  | "profile";

type SidebarItem = {
  key: View;
  label: string;
  icon: React.ElementType;
};

const ITEMS: SidebarItem[] = [
  { key: "products", label: "Products", icon: Package },
  { key: "services", label: "Services", icon: Briefcase },
  { key: "businesses", label: "Businesses", icon: Store },
  { key: "cart", label: "My Cart", icon: ShoppingCart },
  { key: "orders", label: "Orders", icon: ClipboardList },
  { key: "settings", label: "Settings", icon: Settings },
];

type Props = {
  activeView: View;
  onChange: (view: View) => void;
};

export default function Sidebar({ activeView, onChange }: Props) {
  return (
    <aside
      className="
        group fixed top-16 left-0 z-40
        h-[calc(100vh-64px)]
        bg-white border-r border-gray-200
        w-14 hover:w-40
        transition-all duration-300 ease-out
        overflow-hidden
      "
    >
      <div className="h-full flex flex-col justify-between">

        {/* TOP MENU */}
        <div className="pt-6 space-y-1">
          {ITEMS.map((item) => {
            const isActive = activeView === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className={`
                  flex items-center gap-3
                  px-4 py-2 rounded-xl
                  transition
                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-primary/5 hover:text-primary"
                  }
                `}
              >
                <item.icon className="w-5 h-5 shrink-0" />

                {/* LABEL — ONLY ON HOVER */}
                <span
                  className="
                    text-sm font-medium whitespace-nowrap
                    opacity-0 translate-x-2
                    group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-200
                  "
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* BOTTOM — PROFILE */}
        <button
          onClick={() => onChange("profile")}
          className={`
            mb-6 mx-2 flex items-center gap-3
            px-4 py-2 rounded-xl transition
            ${
              activeView === "profile"
                ? "bg-primary/10 text-primary"
                : "text-gray-700 hover:bg-primary/5 hover:text-primary"
            }
          `}
        >
          <User className="w-5 h-5 shrink-0" />
          <span
            className="
              text-sm font-medium whitespace-nowrap
              opacity-0 translate-x-2
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-200
            "
          >
            My Profile
          </span>
        </button>

      </div>
    </aside>
  );
}