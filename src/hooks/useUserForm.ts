import React from "react";
import { IUser } from "../interfaces/userInterface";

interface IUserFormHook {
  formData: IUser;
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
  const [formData, setFormData] = React.useState<IUser>({
    username: user?.username || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
