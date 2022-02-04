import axios from 'axios'
import nookies, { parseCookies } from 'nookies'
import { getToken, setToken } from './handleToken'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    withCredentials: true,
});

export const loginRequest = async ({ data }) => {
    try {
        const {
            data: res,
            data: { success },
        } = await axiosInstance.post("/api/sessions", data);
        if (success) {
            const {
                result: { accessToken, refreshToken },
            } = res;
            setToken(accessToken, refreshToken);
        }
        return res;
    } catch (e) {
        console.log(e)
    }

};

export const adminGetUsersRequest = async ({ accessToken, refreshToken }) => {
    try {
        const { data } = await axiosInstance.get("/api/admin", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-refresh": refreshToken,
            },
        });
        return data;
    } catch (e) {
        console.log(e)
    }
};

export const adminGetUserRequest = async ({ accessToken, refreshToken }, user) => {
    try {
        const { data } = await axiosInstance.get(`/api/admin/${user}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-refresh": refreshToken,
            },
        });
        return data;
    } catch (e) {
        console.log(e)
    }
};

export const adminChange = async (d, cookies) => {
    try {
        const axiosInstance = getToken(cookies)
        const { data } = await axiosInstance.post(`/api/admin`, d)
        return data;
    } catch (err) {
        return null
    }
}

export const getUserState = async (cookies) => {
    try {
        const axiosInstance = getToken(cookies)
        const { data } = await axiosInstance.get("/api/getUser")
        return data
    } catch (e) {
        console.log(e)
    }
}

export const signupRequest = async ({ data }) => {
    try {
        const { data: res } = await axiosInstance.post("/api/users", data);
        return res;
    } catch (e) {
        console.log(e)
        return
    }
};

export const forgotPassRequest = async ({ email }) => {
    try {
        const { data } = await axiosInstance.post("/api/users/forgotPassword", {
            email,
        });
        return data;
    } catch (e) {
        console.log(e)
    }
};

export const resetPasswordRequest = async ({ id, token, password, passwordConfirmation, }) => {
    try {
        const { data } = await axiosInstance.post(
            `/api/users/resetPassword/${id}/${token}`,
            { password, passwordConfirmation }
        );
        return data;
    } catch (e) {
        console.log(e)
    }
};

export const startQuiz = async ({ domain }, cookies) => {
    try {
        const axiosInstance = getToken(cookies)
        const { data } = await axiosInstance.post(`/api/start`, { domain })
        return data
    } catch (e) {
        console.log(e)
    }
}

export const getQuestions = async ({ domain }, cookies) => {
    try {
        const axiosInstance = getToken(cookies)
        const { data } = await axiosInstance.post(`/api/questions`, { domain: domain })
        return data
    } catch (err) {
        return null
    }
}

export const submitQuiz = async (d, cookies) => {
    try {
        const axiosInstance = getToken(cookies)
        const { data } = await axiosInstance.post(`/api/submit`, d)
        return data;
    } catch (err) {
        return null
    }
}

export const submitURL = async ({ domain, cookies, value }) => {
    try {
        const axiosInstance = getToken(cookies)
        const { data } = await axiosInstance.put(`/api/users/info`, { portfolio: { category: domain, link: value } })
        return data
    } catch (e) {
        console.log(e)
    }
}