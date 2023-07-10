import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return children;
};

export default PrivateRoute;


