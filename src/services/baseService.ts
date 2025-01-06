import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://server-n42x.onrender.com";

export interface BaseResponse<T = any> {
  data: T | null;
  error: string | null;
  status?: number;
}

const baseService = async <T = any>(
  url: string,
  method: AxiosRequestConfig["method"],
  data?: any
): Promise<BaseResponse<T>> => {
  const response: BaseResponse<T> = {
    data: null,
    error: null,
  };

  try {
    const token = localStorage.getItem("authToken");
    const axiosResponse: AxiosResponse<T> = await axios({
      url: BASE_URL + url,
      method: method,
      data: data,
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
    });

    response.data = axiosResponse.data;
    response.status = axiosResponse.status;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      response.error =
        error.response?.data?.error || error.message || "An error occurred.";
      response.status = error.response?.status;
    } else {
      response.error = "Unknown error occurred.";
    }
  }

  return response;
};

export default baseService;
