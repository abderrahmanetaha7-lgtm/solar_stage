import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppSkeleton from "../components/skeleton/AppSkeleton";

export default function ProtectedRoute({ children }) {
  const { authenticated, checkingAuth } = useSelector((state) => state.auth);

  if (checkingAuth) {
    return <AppSkeleton />;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
