import axios from "axios";

export const baseURL = "http://localhost:3001";

// export const authToken = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: baseURL,
  responseType: "json",
  // headers: { Authorization: authToken },
});
