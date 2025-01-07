import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useUserList } from "../hooks/useUserList";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import UserFormPopup from "./UserFormPopup";

const UserList = () => {
  const {
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
  } = useUserList();

  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  if (isLoadingUsers) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const handleDeleteClick = async (userId: string) => {
    setDeletingUserId(userId);
    await handleDeleteUser(userId);
    setDeletingUserId(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" component="h1" color="text.primary">
          User Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleAddUserPopup}
          disabled={isLoadingAdd}
        >
          {isLoadingAdd ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Add User"
          )}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 1, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "secondary.main" }}>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any) => (
              <TableRow
                key={user._id}
                sx={{
                  backgroundColor: "background.default",
                  "&:hover": { backgroundColor: "secondary.main" },
                  marginBottom: 2,
                  borderBottom: "1.5px solid #D6D6D6",
                }}
              >
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.fullName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => toggleUpdateUserPopup(user)}
                    disabled={isLoadingUpdate}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(user._id)}
                    disabled={isLoadingDelete}
                    color="primary"
                  >
                    {deletingUserId === user._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Delete />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isAddUserOpen && (
        <UserFormPopup
          isOpen={isAddUserOpen}
          onClose={toggleAddUserPopup}
          onSubmit={handleAddUser}
          error={addEditError}
          isLoading={isLoadingAdd}
        />
      )}
      {isUpdateUserOpen && selectedUser && (
        <UserFormPopup
          isOpen={isUpdateUserOpen}
          onClose={toggleUpdateUserPopup}
          onSubmit={(data) => handleUpdateUser(selectedUser._id!, data)}
          error={addEditError}
          user={selectedUser}
          isEditMode
          isLoading={isLoadingUpdate}
        />
      )}
    </Box>
  );
};

export default UserList;
