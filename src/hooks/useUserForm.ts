import { useState } from "react";
import { IUser } from "../interfaces/userInterface";

interface IFieldState {
  value: string;
  error: string | null;
  helperText: string | null;
}

interface IUserFormHook {
  fields: {
    [key: string]: IFieldState;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

interface IUserFormHookProps {
  user?: IUser;
  onSubmit: (data: IUser) => void;
}

export const useUserForm = ({
  user,
  onSubmit,
}: IUserFormHookProps): IUserFormHook => {
  const [fields, setFields] = useState<{ [key: string]: IFieldState }>({
    username: {
      value: user?.username || "",
      error: null,
      helperText: null,
    },
    fullName: {
      value: user?.fullName || "",
      error: null,
      helperText: null,
    },
    email: {
      value: user?.email || "",
      error: null,
      helperText: null,
    },
    password: {
      value: user?.password || "",
      error: null,
      helperText: null,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: null,
        helperText: null,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    if (isValid) {
      const formData: IUser = {
        username: fields.username.value,
        fullName: fields.fullName.value,
        email: fields.email.value,
        password: fields.password.value,
      };
      onSubmit(formData);
    }
  };

  return {
    fields,
    handleChange,
    handleSubmit,
  };
};
