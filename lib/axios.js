import axios from 'axios'
import { getClientToken, getToken, setToken } from './handleToken'

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

export const forgotPassRequest = async ({ email }) => {
    const { data } = await axiosInstance.post('/api/users/forgotPassword', { email })
    return data
}

export const resetPasswordRequest = async ({ id, token, password, passwordConfirmation }) => {
    const { data } = await axiosInstance.post(`/api/users/resetPassword/${id}/${token}`, { password, passwordConfirmation })
    return data
}

export const startQuiz = async ( { ctx, domain } ) => {
    getToken(ctx);
    const { data } = await axiosInstance.post(`/api/start`, { domain: domain })
    return data
}

export const getQuestions = async ( { ctx, domain } ) => {
    getToken(ctx);
    try {
        const { data } = await axiosInstance.post(`/api/questions`, { domain: domain })
        return data
    } catch(err) {
        return err.response.data;
    }
}

export const autoSaveQuiz = async ( d ) => {
    getClientToken();
    try {
        const { data } = await axiosInstance.post(`/api/submit`, d)
        return data;
    } catch (err) {
        return err.response.data;
    }
}

export const submitQuiz = async ( d ) => {
    getClientToken();
    try {
        const { data } = await axiosInstance.post(`/api/submit`, d)
        return data;
    } catch (err) {
        return err.response.data;
    }
}