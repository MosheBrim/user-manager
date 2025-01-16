import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { useUserList } from "../../hooks/useUserList";
import ErrorMessage from "../shared/ErrorMessage";
import UserFormPopup from "../popups/UserFormPopup";
import { IUser } from "../../interfaces/userInterface";

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

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => toggleUpdateUserPopup(params.row)}
            color="primary"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteUser(params.row._id)}
            color="primary"
          >
            {isLoadingDelete[params.row._id] ? (
              <CircularProgress size={24} />
            ) : (
              <Delete />
            )}
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = users.map((user: IUser) => ({
    id: user._id,
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    password: user.password,
  }));

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
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
          Add User
        </Button>
      </Box>

      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoadingUsers}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 50, 100]}
          disableRowSelectionOnClick
          sx={{ maxHeight: "66vh" }}
        />
      </Box>

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
