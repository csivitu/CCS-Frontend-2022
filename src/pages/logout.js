import { destroyCookie } from 'nookies';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        destroyCookie(null, 'refreshToken');
        destroyCookie(null, 'accessToken');
        destroyCookie(null, 'domainsAttempted');
        destroyCookie(null, 'username');
        router.push('/');
    }, []);

    return null;
};

export default Logout;
