import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, resetStore } from "../redux/store";

export const useLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.admin);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(resetStore());
    navigate("/login");
  };

  return {
    username,
    handleLogout,
  };
};
