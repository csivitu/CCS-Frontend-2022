import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import nookies from 'nookies';
// import LinkedIn from '../../../public/assets/LinkedIn.svg';
// import GitHub from '../../../public/assets/Github.svg';
// import Instagram from '../../../public/assets/Instagram.svg';
// import Spotify from '../../../public/assets/Spotify.svg';
import { DomainURL } from '../../components/CustomForm';
import { getUserState } from '../../lib/axios';
import Navbar from '../../components/Navbar';
// import LinkModal from '../../components/LinkModal';
import Head from 'next/head';
import { ToastContext } from '../../components/ToastContext';
import { createAvatar } from '@dicebear/core';
import { adventurerNeutral } from '@dicebear/collection';

const Dashboard = ({ username, name, query, portfolio }) => {
    const populateURL = (domain) => {
        const oneLink = portfolio.find((e) => e.category === domain);
        if (!oneLink) return '';
        return oneLink.link;
    };

    const avatar = createAvatar(adventurerNeutral, {
        seed: username,
    });

    const svgString = avatar.toString();
    // const [newURL, setNewURL] = useState('');
    // const [select, setSelect] = useState('');
    const [management, setManagement] = useState(populateURL('management'));
    const [tech, setTech] = useState(populateURL('tech'));
    const [design, setDesign] = useState(populateURL('design'));
    const [video, setVideo] = useState(populateURL('video'));
    const { handleSnackOpen } = useContext(ToastContext);
    useEffect(() => {
        if (query) {
            const { success, msg } = query;
            if (success === 'false') {
                handleSnackOpen({
                    message: msg,
                    variant: 'error',
                });
            } else {
                handleSnackOpen({
                    message: msg,
                    variant: 'success',
                });
            }
        }
    }, []);

    return (
        <>
            <Head>
                <title>CSI-CCS | Dashboard</title>
            </Head>
            <Navbar username={username} loggedIn={true} dashBoard={true} />

            <div className="min-h-screen flex flex-col lg:flex-row px-5 gap-10 items-center justify-center bg-grid bg-no-repeat bg-cover bg-center relative">
                <Link href="/" passHref shallow={true}>
                    <button className="transition ease-linear py-3 px-5 rounded text-gray-dark bg-peach hover:bg-transparent hover:text-peach border-2 border-peach absolute top-4 left-4 md:top-10 md:left-10 scale-75 md:scale-100">
                        &larr; BACK
                    </button>
                </Link>
                <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 mt-24 lg:w-1/5">
                    <div className="bg-peach rounded-xl overflow-hidden">
                        <img
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`}
                            alt="avatar"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="flex flex-col sm:items-start items-center gap-2">
                        <h1 className="uppercase font-bold text-4xl ">{name}</h1>
                        <p className="italic text-3xl font-thin">{username}</p>
                        {/* <h1 className="uppercase font-bold text-2xl mt-2">SOCIALS</h1>
            <div className="flex text-3xl gap-2 w-full justify-evenly">
              <LinkedIn className="hover:text-peach" />
              <GitHub />
              <Instagram />
              <Spotify />
            </div> */}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-6xl">
                    <h1 className="uppercase font-bold text-4xl text-center pl-0 sm:pl-24">PORTFOLIO</h1>
                    <p className="text-3xl font-extralight self-start mb-6 text-center w-full pl-0 sm:pl-24">
                        Show us your work
                    </p>
                    <div className="flex flex-col gap-2">
                        <DomainURL
                            domain="management"
                            value={management}
                            setValue={setManagement}
                            handleSnackOpen={handleSnackOpen}
                        />
                        <DomainURL
                            domain="design"
                            value={design}
                            setValue={setDesign}
                            handleSnackOpen={handleSnackOpen}
                        />
                        <DomainURL domain="tech" value={tech} setValue={setTech} handleSnackOpen={handleSnackOpen} />
                        <DomainURL domain="video" value={video} setValue={setVideo} handleSnackOpen={handleSnackOpen} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

export async function getServerSideProps(context) {
    const { query } = context;
    const cookies = nookies.get(context);
    const res = await getUserState(cookies);
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
            userId: { username, name },
            portfolio,
        },
    } = res;
    console.log(JSON.stringify(res));
    if (query.success && query.msg) {
        return {
            props: { username, name, query, portfolio },
        };
    }
    return {
        props: { username, name, query: false, portfolio },
    };
}
