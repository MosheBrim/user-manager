import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
