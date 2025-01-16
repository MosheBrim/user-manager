import { createBrowserRouter } from "react-router-dom";
import SafeRouter from "./SafeRouter";
import Login from "../components/Login";
import Layout from "../components/Layout";
import UserList from "../components/UserList";
import NotFound from "../components/NotFound";
import ErrorElement from "../components/ErrorElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SafeRouter>
        <Layout />
      </SafeRouter>
    ),
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <UserList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
