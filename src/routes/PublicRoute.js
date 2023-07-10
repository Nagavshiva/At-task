import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (accessToken) {
      navigate("/side");
    } else {
      setShouldRender(true);
    }
  }, [accessToken, navigate]);

  return shouldRender ? children : null;
};

export default PublicRoute;


