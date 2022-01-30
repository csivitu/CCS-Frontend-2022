import { axiosInstance } from "./api";
import { updateToken } from "./updateToken";

export const signupRequest = async ({ data }) => {
  return await axiosInstance
    .post("/api/users", data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response) return err.response.data;
      else {
        window.location.href = "/";
        alert(
          "Something went wrong from our end. Please try again later or contact our technical team."
        );
      }
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
      if (err.response) return err.response.data;
      else {
        window.location.href = "/";
        alert(
          "Something went wrong from our end. Please try again later or contact our technical team."
        );
      }
    });
};
