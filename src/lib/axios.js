import axios from 'axios';
import { getToken, setToken } from './handleToken';

export const axiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    baseURL: "http://localhost:3002",
    withCredentials: true,
});

export const loginRequest = async ({ data }) => {
    try {
        const {
            data: res,
            data: { success },
        } = await axiosInstance.post('/api/sessions', data);
        if (success) {
            const {
                result: { accessToken, refreshToken },
            } = res;
            setToken(accessToken, refreshToken);
        }
        return res;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const adminGetUsersRequest = async ({ accessToken, refreshToken }) => {
    try {
        const { data } = await axiosInstance.get('/api/admin', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'x-refresh': refreshToken,
            },
        });
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const adminDeleteUsersRequest = async (username, cookies) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.delete(`/api/admin/deleteUser`, { data: { username } });
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const adminGetUserRequest = async (cookies, user) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.get(`/api/admin/${user}`);
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const adminChange = async (d, cookies) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.post(`/api/admin`, d);
        return data;
    } catch (err) {
        return null;
    }
};
export const adminCorrect = async (d, cookies) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.post(`/api/admin/correct`, d);
        return data;
    } catch (err) {
        return null;
    }
};

export const getUserState = async (cookies) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.get('/api/getUser');
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const signupRequest = async ({ data }) => {
    try {
        const { data: res } = await axiosInstance.post('/api/users', data);
        return res;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const forgotPassRequest = async ({ email }) => {
    try {
        const { data } = await axiosInstance.post('/api/users/forgotPassword', {
            email,
        });
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const resetPasswordRequest = async ({ id, token, password, passwordConfirmation }) => {
    try {
        const { data } = await axiosInstance.post(`/api/users/resetPassword/${id}/${token}`, {
            password,
            passwordConfirmation,
        });
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const startQuiz = async ({ domain }, cookies) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.post(`/api/start`, { domain });
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const getQuestions = async ({ domain }, cookies) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.post(`/api/questions`, { domain: domain });
        return data;
    } catch (err) {
        console.log(err.response);
        return null;
    }
};

export const submitQuiz = async (d, cookies) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.post(`/api/submit`, d);
        return data;
    } catch (err) {
        console.log(err.response);
        return { error: true };
    }
};

export const submitURL = async ({ domain, cookies, value }) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.put(`/api/users/info`, { portfolio: { category: domain, link: value } });
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const getTasks = async ({ cookies }) => {
    try {
        const axiosInstance = getToken(cookies);
        const res = await axiosInstance.get("/api/users/task");
        console.log(res);
        const { data: { result } } = res;
        return result;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};

export const submitTasks = async (cookies, subdomain, task) => {
    try {
        const axiosInstance = getToken(cookies);
        const { data } = await axiosInstance.put("/api/users/task", { subdomain, task });
        return data;
    } catch (e) {
        console.log(e.response);
        return { error: true };
    }
};