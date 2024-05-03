import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();

  if (!localStorage.getItem("user_id")) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
