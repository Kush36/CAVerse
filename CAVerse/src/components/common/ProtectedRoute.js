// src/components/common/ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function ProtectedRoute() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-6xl font-bold text-purple-500 animate-pulse">CaVerse</div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}