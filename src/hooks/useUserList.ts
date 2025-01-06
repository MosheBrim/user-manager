import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userService";
import {
  setUsers,
  addUser as addUserToSlice,
  removeUser,
} from "../redux/usersSlice";
import { RootState } from "../redux/store";
import { IUser } from "../interfaces/userInterface";

export const useUserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addEditError, setAddEditError] = useState<string | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const validateRequiredFields = (data: IUser): boolean => {
    const allFieldsFilled = Object.values(data).every(
      (value) => value !== undefined && value !== null && value !== ""
    );

    if (!allFieldsFilled) {
      setAddEditError("All fields are required.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoadingUsers(true);
      setError(null);

      const response = await fetchAllUsers();

      if (response.error) {
        setError(response.error);
      } else {
        dispatch(setUsers(response.data || []));
      }

      setIsLoadingUsers(false);
    };

    fetchUsers();
  }, [dispatch]);

  const toggleAddUserPopup = () => {
    setIsAddUserOpen((prev) => !prev);
    setAddEditError(null);
  };

  const handleAddUser = async (data: IUser) => {
    if (!validateRequiredFields(data)) return;

    setIsLoadingAdd(true);
    setAddEditError(null);

    const response = await addUser(data);

    if (response.error) {
      setAddEditError(response.error);
    } else {
      dispatch(addUserToSlice(response.data));
      toggleAddUserPopup();
    }

    setIsLoadingAdd(false);
  };

  const toggleUpdateUserPopup = (user?: IUser) => {
    setSelectedUser(user || null);
    setIsUpdateUserOpen((prev) => !prev);
    setAddEditError(null);
  };

  const handleUpdateUser = async (id: string, data: IUser) => {
    if (!validateRequiredFields(data)) return;

    setIsLoadingUpdate(true);
    setAddEditError(null);

    const response = await updateUser(id, data);

    if (response.error) {
      setAddEditError(response.error);
    } else {
      dispatch(
        setUsers(users.map((user) => (user._id === id ? response.data : user)))
      );
      setIsUpdateUserOpen(false);
    }

    setIsLoadingUpdate(false);
  };

  const handleDeleteUser = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) return;

    setIsLoadingDelete(true);
    setAddEditError(null);

    const response = await deleteUser(id);

    if (response.error) {
      alert(`Error deleting user: ${response.error}`);
      setAddEditError(response.error);
    } else {
      dispatch(removeUser(id));
    }

    setIsLoadingDelete(false);
  };

  return {
    users,
    isLoadingUsers,
    isLoadingAdd,
    isLoadingUpdate,
    isLoadingDelete,
    error,
    addEditError,
    isAddUserOpen,
    isUpdateUserOpen,
    selectedUser,
    toggleAddUserPopup,
    toggleUpdateUserPopup,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
  };
};
