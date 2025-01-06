import { createBrowserRouter } from "react-router-dom";
import SafeRouter from "./SafeRouter";
import Login from "../components/Login";
import Layout from "../components/Layout";
import UserList from "../components/UserList";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SafeRouter>
        <Layout />
      </SafeRouter>
    ),
    errorElement: <NotFound />,
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
]);

export default router;
