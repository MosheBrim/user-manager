import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/loginService";

interface IFieldState {
  value: string;
  error: string | null;
  helperText: string | null;
}

interface UseLoginReturn {
  fields: { [key: string]: IFieldState };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const [fields, setFields] = useState<{ [key: string]: IFieldState }>({
    username: { value: "", error: null, helperText: null },
    password: { value: "", error: null, helperText: null },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, error: null, helperText: null },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    let isValid = true;
    const updatedFields = { ...fields };

    for (const key in updatedFields) {
      if (updatedFields[key].value.trim() === "") {
        updatedFields[key].error = `${key} is required`;
        updatedFields[key].helperText = `Please enter a ${key}`;
        isValid = false;
      }
    }

    setFields(updatedFields);

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    const response = await loginService({
      username: fields.username.value,
      password: fields.password.value,
    });

    if (response.error) {
      setError(response.error);
      setIsLoading(false);
      return;
    }

    if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
      navigate(`/`);
    }

    setIsLoading(false);
  };

  return {
    fields,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  };
};
