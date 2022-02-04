import { destroyCookie } from 'nookies'
import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {

  const router = useRouter()
  useEffect(() => {
    destroyCookie(null, 'refreshToken')
    destroyCookie(null, 'accessToken')
    router.push('/')
  }, [router]);

  return null;
};

export default Logout;



