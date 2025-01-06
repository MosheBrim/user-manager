import { IUser } from "../interfaces/userInterface";
import baseService from "./baseService";

const USERS_API_URL = "/api/users";

export const fetchAllUsers = async () => {
  return await baseService(`${USERS_API_URL}`, "GET");
};

export const fetchUserById = async (id: string) => {
  return await baseService(`${USERS_API_URL}/${id}`, "GET");
};

export const addUser = async (data: IUser) => {
  return await baseService(`${USERS_API_URL}`, "POST", data);
};

export const updateUser = async (id: string, data: IUser) => {
  return await baseService(`${USERS_API_URL}/${id}`, "PUT", data);
};

export const deleteUser = async (id: string) => {
  return await baseService(`${USERS_API_URL}/${id}`, "DELETE");
};
