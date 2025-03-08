import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user && user.role === "admin" ? element : <Navigate to="/" />;
};

export default AdminRoute;