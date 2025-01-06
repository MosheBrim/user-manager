import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/loginService";

interface UseLoginReturn {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  handleLogin: () => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginService({ username, password });

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate(`/`);


      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
  };
};
