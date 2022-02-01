import { axiosInstance } from "./axios";
import nookies, { parseCookies } from 'nookies'


export const setToken = (accessToken, refreshToken) => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
    axiosInstance.defaults.headers['x-refresh'] = refreshToken
    nookies.set(null, 'accessToken', accessToken);
    nookies.set(null, 'refreshToken', refreshToken);
    return
};

export const getToken = () => {
    const { accessToken, refreshToken } = parseCookies()
    axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
    axiosInstance.defaults.headers['x-refresh'] = refreshToken
};
