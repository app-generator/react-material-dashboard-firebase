import { Navigate, Outlet } from "react-router-dom";
import { useFirebaseAuth } from "context/auth.context";

export const ProtectedRoute = () => {
  const { isSignedIn } = useFirebaseAuth();

  return isSignedIn ? <Outlet /> : <Navigate to="/authentication/sign-in" />;
};