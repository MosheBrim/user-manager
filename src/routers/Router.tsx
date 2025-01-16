import { createBrowserRouter } from "react-router-dom";
import SafeRouter from "./SafeRouter";
import Login from "../components/pages/Login";
import Layout from "../components/layouts/Layout";
import UserList from "../components/pages/UserList";
import NotFound from "../components/pages/NotFound";
import ErrorElement from "../components/pages/ErrorElement";

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
