

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { auth, loading } = useContext(AuthContext);

  // While AuthContext is still checking localStorage/session → show loader
  if (loading) return <div>Loading...</div>;

  // No token → kick user to login
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch → block
  if (role && auth?.user?.role && auth.user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
