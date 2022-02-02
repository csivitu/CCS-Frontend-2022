import { isEmpty } from "lodash";

export function authorize(gssp) {
  return async (ctx) => {
    const { req: { cookies = {} } } = ctx;
    if (isEmpty(cookies)) {
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