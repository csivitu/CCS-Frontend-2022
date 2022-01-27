import { axiosInstance } from "./api";
import { updateToken } from "./updateToken";

export const signupRequest = async ({ data }) => {
  return await axiosInstance
    .post("/api/users", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const loginRequest = async ({ data }) => {
  return await axiosInstance
    .post("/api/sessions", data)
    .then((response) => {
      if (response.data.success) {
        updateToken(
          response.data.result.accessToken,
          response.data.result.refreshToken
        );
      }
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
