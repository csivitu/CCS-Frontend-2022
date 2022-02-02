import { destroyCookie } from 'nookies'
import { useEffect } from "react";
import { useRouter } from "next/router";

const logout = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    destroyCookie(null, 'refreshToken')
    destroyCookie(null, 'accessToken')
    router.push('/')
  }, [router]);

  return null;
};

export default logout;



