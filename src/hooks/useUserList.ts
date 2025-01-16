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
import { showAlert, showConfirm } from "./useGlobalAlert";

export const useUserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<
    Record<string, boolean>
  >({});

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [addEditError, setAddEditError] = useState<string | null>(null);
  
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

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

    if (Array.isArray(users)) {
      const initialLoadingState = users.reduce(
        (acc: Record<string, boolean>, user: any) => {
          acc[user._id] = false;
          return acc;
        },
        {}
      );
      setIsLoadingDelete(initialLoadingState);
    }
  }, [dispatch]);

  const toggleAddUserPopup = () => {
    setIsAddUserOpen((prev) => !prev);
    setAddEditError(null);
  };

  const handleAddUser = async (data: IUser) => {
    setIsLoadingAdd(true);
    setAddEditError(null);

    const response = await addUser(data);

    if (response.error) {
      setAddEditError(response.error);
    } else {
      dispatch(addUserToSlice(response.data));
      showAlert("User added successfully.", "success");
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
    setIsLoadingUpdate(true);
    setAddEditError(null);

    const response = await updateUser(id, data);

    if (response.error) {
      setAddEditError(response.error);
    } else {
      dispatch(
        setUsers(users.map((user) => (user._id === id ? response.data : user)))
      );
      showAlert("User updated successfully.", "success");
      setIsUpdateUserOpen(false);
    }
    setIsLoadingUpdate(false);
  };

  const handleDeleteUser = async (id: string) => {
    showConfirm(
      "Delete User",
      "Are you sure you want to delete this user?",
      async () => {
        setIsLoadingDelete({ ...isLoadingDelete, [id]: true });
        const response = await deleteUser(id);

        if (response.error) {
          showAlert(`Error deleting user: ${response.error}`, "error");
        } else {
          showAlert("User deleted successfully.", "success");
          dispatch(removeUser(id));
        }
        setIsLoadingDelete({ ...isLoadingDelete, [id]: false });
      },
      () => {
        setIsLoadingDelete({ ...isLoadingDelete, [id]: false });
      },
      "Delete"
    );
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
