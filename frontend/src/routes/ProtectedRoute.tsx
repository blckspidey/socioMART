import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  role?: "seller"; // optional
};

export default function ProtectedRoute({ role }: Props) {
  const { isAuthenticated, user } = useAuth();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not seller
  if (role === "seller" && user?.role !== "seller") {
    return <Navigate to="/explore" replace />;
  }

  return <Outlet />;
}
