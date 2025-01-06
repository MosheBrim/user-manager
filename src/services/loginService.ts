import baseService from "./baseService";

interface UserLoginReq {
  username: string;
  password: string;
}

const loginService = async (data: UserLoginReq) => {
  const url = "/api/auth/login";
  const response = await baseService(url, "post", data);
  return response;
};

export default loginService;
