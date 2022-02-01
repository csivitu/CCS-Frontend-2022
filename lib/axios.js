import axios from 'axios'
// import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { getToken, setToken } from './handleToken'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true
})

export const loginRequest = async ({ data }) => {
    const { data: res, data: { result: { accessToken, refreshToken } } } = await axiosInstance.post("/api/sessions", data)
    setToken(accessToken, refreshToken);
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

// createAuthRefreshInterceptor(axiosInstance, failedRequest =>
//   // 1. First try request fails - refresh the token.
//   axiosInstance.get('/api/refreshToken').then(resp => {
//     // 1a. Clear old helper cookie used in 'authorize.ts' higher order function.
//     if (axiosInstance.defaults.headers.setCookie) {
//       delete axiosInstance.defaults.headers.setCookie
//     }
//     const {accessToken} = resp.data
//     // 2. Set up new access token
//     const bearer = `Bearer ${accessToken}`
//     axiosInstance.defaults.headers.Authorization = bearer

//     // 3. Set up new refresh token as cookie
//     const responseCookie = setCookie.parse(resp.headers['set-cookie'])[0] // 3a. We can't just acces it, we need to parse it first.
//     axiosInstance.defaults.headers.setCookie = resp.headers['set-cookie'] // 3b. Set helper cookie for 'authorize.ts' Higher order Function.
//     axiosInstance.defaults.headers.cookie = cookie.serialize(
//       responseCookie.name,
//       responseCookie.value,
//     )
//     // 4. Set up access token of the failed request.
//     failedRequest.response.config.headers.Authorization = bearer

//     // 5. Retry the request with new setup!
//     return Promise.resolve()
//   }),
// )

