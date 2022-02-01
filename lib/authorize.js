import { getToken } from "./handleToken";
import nookies from 'nookies'

export function authorize(gssp) {
  return async (ctx) => {
    const cookies = nookies.get(ctx)
    if (!cookies.refreshToken) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        }
      }
    }
    return await gssp(ctx)
  }
}