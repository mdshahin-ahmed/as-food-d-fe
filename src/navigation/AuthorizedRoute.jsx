import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/app/useAuth";

const AuthorizedRoute = ({ permissions, children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasPermission = permissions?.includes(user?.role);

  useEffect(() => {
    if (!hasPermission) {
      navigate("/home");
    }
  }, [user, hasPermission, navigate]);

  if (hasPermission) {
    return children;
  }
};

export default AuthorizedRoute;
