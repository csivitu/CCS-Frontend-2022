import axios from 'axios'
import { getToken, setToken } from './handleToken'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true
})

export const loginRequest = async ({ data }) => {
    const { data: res, data: { success } } = await axiosInstance.post("/api/sessions", data)
    if (success) {
        const { result: { accessToken, refreshToken } } = res;
        setToken(accessToken, refreshToken);
    }
    return res
}

export const getUserState = async () => {
    getToken();
    const { data } = await axiosInstance.get("/api/getUser")
    return data
}

export const signupRequest = async ({ data }) => {
    const { data: res } = await axiosInstance.post("/api/users", data)
    return res
};