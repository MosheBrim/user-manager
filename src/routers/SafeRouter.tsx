import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { AppDispatch } from "../redux/store";
import { setAdmin } from "../redux/adminSlice";
import { fetchUserById } from "../services/userService";
import LoadingSpinner from "../components/LoadingSpinner";

interface SafeRouterProps {
  children: React.ReactNode;
}

interface DecodedToken {
  id: string;
}

const SafeRouter: React.FC<SafeRouterProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("Token is missing.");
        setIsLoading(false);
        return;
      }

      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      const userResponse = await fetchUserById(decoded.id);

      if (userResponse.error) {
        setError(userResponse.error);
      } else {
        dispatch(
          setAdmin({
            _id: userResponse.data?._id,
            username: userResponse.data?.username,
            fullName: userResponse.data?.fullName,
            email: userResponse.data?.email,
            authToken: token,
          })
        );
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default SafeRouter;
