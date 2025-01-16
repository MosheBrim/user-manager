import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/userInterface";

const initialState: AdminState = {
  _id: "",
  username: "",
  fullName: "",
  email: "",
  authToken: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<AdminState>) {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.authToken = action.payload.authToken;
    },
    clearAdmin(state) {
      state._id = "";
      state.username = "";
      state.fullName = "";
      state.email = "";
      state.authToken = "";
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
