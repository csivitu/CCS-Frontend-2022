import { axiosInstance } from './axios';
import nookies from 'nookies';

export const setToken = (accessToken, refreshToken) => {
    nookies.set(null, 'accessToken', accessToken);
    nookies.set(null, 'refreshToken', refreshToken, { maxAge: 3600 * 24 * 365 });
    return;
};

export const getToken = ({ accessToken, refreshToken }) => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    axiosInstance.defaults.headers['x-refresh'] = refreshToken;
    return axiosInstance;
};
