import axios from 'axios'
import nookies, { parseCookies } from 'nookies'
import { getToken, setToken } from './handleToken'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
});

export const loginRequest = async ({ data }) => {
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
};

export const adminGetUsersRequest = async ({ accessToken, refreshToken }) => {
    const { data } = await axiosInstance.get("/api/admin", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-refresh": refreshToken,
        },
    });
    return data;
};

export const adminGetUserRequest = async ({ accessToken, refreshToken }, user) => {
    const { data } = await axiosInstance.get(`/api/admin/${user}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-refresh": refreshToken,
        },
    });
    return data;
};

export const getUserState = async (cookies) => {
    const axiosInstance = getToken(cookies)
    const { data } = await axiosInstance.get("/api/getUser")
    return data
}

export const signupRequest = async ({ data }) => {
    const { data: res } = await axiosInstance.post("/api/users", data);
    return res;
};

export const forgotPassRequest = async ({ email }) => {
    const { data } = await axiosInstance.post("/api/users/forgotPassword", {
        email,
    });
    return data;
};

export const resetPasswordRequest = async ({
    id,
    token,
    password,
    passwordConfirmation,
}) => {
    const { data } = await axiosInstance.post(
        `/api/users/resetPassword/${id}/${token}`,
        { password, passwordConfirmation }
    );
    return data;
};

export const startQuiz = async ({ domain }, cookies) => {
    const axiosInstance = getToken(cookies)
    const { data } = await axiosInstance.post(`/api/start`, { domain })
    return data
}

export const getQuestions = async ({ domain }, cookies) => {
    try {
        const axiosInstance = getToken(cookies)
        const { data } = await axiosInstance.post(`/api/questions`, { domain: domain })
        return data
    } catch (err) {
        console.log(err)
        return null
    }
}

export const submitQuiz = async (d, cookies) => {
    try {
        const axiosInstance = getToken(cookies)
        const { data } = await axiosInstance.post(`/api/submit`, d)
        console.log(data)
        return data;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const submitURL = async (cookies) => {
    const axiosInstance = getToken(cookies)

}