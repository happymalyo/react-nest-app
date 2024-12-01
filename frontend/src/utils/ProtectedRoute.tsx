import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        toast.error("Veuillez  vous connecter s'il vous plaît.");
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch("/auth/validate-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          toast.error("Veuillez  vous connecter s'il vous plaît.");
          setIsValid(false);
        }
      } catch {
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  //   return isVal/id ? <>{children}</> : <Navigate to="/login" />;
  if (isValid) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
