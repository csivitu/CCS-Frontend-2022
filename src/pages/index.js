import dynamic from 'next/dynamic';
import Head from 'next/head';
import FAQs from '../components/FAQs';
import LandingPortfolio from '../components/LandingPortfolio';
import Footer from '../components/Footer';
import nookies from 'nookies';
import { getUserState } from '../lib/axios.js';
import { useContext, useEffect } from 'react';
import FloatingDiscord from '../components/FloatingDiscord.js';
import { ToastContext } from '../components/ToastContext.js';

const DynamicHero = dynamic(() => import('../components/Hero'));
const DynamicNavbar = dynamic(() => import('../components/Navbar'));
const DynamicDomains = dynamic(() => import('../components/Domains'));

export function Home({ loggedIn, username, domainsAttempted = {}, rateLimited }) {
    const { handleSnackOpen } = useContext(ToastContext);
    useEffect(() => {
        if (rateLimited) {
            handleSnackOpen({
                message: "Hey Buddy!, You're sending too many requests :(",
                variant: 'error',
            });
        }
        return () => {
            rateLimited = false;
        };
    }, [rateLimited]);

    return (
        <>
            <Head>
                <title>CSI - Core Committee enrollments</title>
            </Head>
            <DynamicHero loggedIn={loggedIn} />
            <DynamicNavbar loggedIn={loggedIn} username={username} dashBoard={false} />
            <DynamicDomains domainsAttempted={domainsAttempted} />
            <LandingPortfolio />
            <FAQs />
            <Footer />
            {/* <FloatingDiscord /> */}
        </>
    );
}

export default Home;

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    if (!cookies.refreshToken) {
        return {
            props: { loggedIn: false },
        };
    }
    const res = await getUserState(cookies);

    if (res === 'Too many requests, please try again later.') {
        if (cookies.username) {
            return {
                props: { loggedIn: true, username: cookies.username, domainsAttempted: cookies.domainsAttempted },
            };
        }
        return {
            props: { rateLimited: true },
        };
    }

    if (!res.success) {
        return {
            redirect: {
                permanent: true,
                destination: '/logout',
            },
        };
    }
    const {
        result: {
            userId: { username },
            domainsAttempted,
        },
    } = res;
    nookies.set(context, 'username', username, {
        maxAge: 3600 * 24 * 365,
        path: '/',
    });
    nookies.set(context, 'domainsAttempted', domainsAttempted, {
        maxAge: 3600 * 24 * 365,
        path: '/',
    });

    return {
        props: { loggedIn: true, username, domainsAttempted, rateLimited: false },
    };
}
