// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "student") {
    return <Navigate to="/AlifAkhAcademy/login" />;
  }

  return children;
};

export default ProtectedRoute;
