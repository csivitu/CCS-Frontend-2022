/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Head from 'next/head';
import { getTasks } from '../../lib/axios';
import nookies from 'nookies';
import DomainTask from '../../components/DomainTask';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

const Tasks = ({ techTasks, designTasks, videoTasks, managementTasks, username }) => {
    const domains = [];
    if (techTasks && techTasks.length > 0) {
        domains.push('Tech');
    }
    if (designTasks && designTasks.length > 0) {
        domains.push('Design');
    }
    if (videoTasks && videoTasks.length > 0) {
        domains.push('Video');
    }
    if (managementTasks && managementTasks.length > 0) {
        domains.push('Management');
    }
    const [selectedDomain, setSelectedDomain] = useState(domains[0]);
    return (
        <>
            <Head>
                <title>CSI-CCS | Tasks</title>
            </Head>
            <Navbar tasksPage={true} loggedIn={true} username={username} dashBoard={true} />
            <div className="flex flex-col items-center justify-center gap-4 pt-10 select-text">
                {domains.length > 0 && (
                    <div
                        className={`--domain-menu w-[80%] mb-6 md:w-[30%] h-fit border-2 border-white rounded-[10px] p-[4px] flex ${
                            domains.length === 1 ? 'gap-0' : 'gap-[1%]'
                        }`}
                    >
                        <button
                            type="button"
                            className={`${
                                domains.length === 1 ? 'w-[100%]' : 'w-[50%]'
                            } h-full py-1  rounded-[6px] text-lg ${
                                selectedDomain === domains[0] ? 'bg-white text-black' : ' text-white'
                            }`}
                            onClick={() => setSelectedDomain(domains[0])}
                        >
                            {domains[0]}
                        </button>
                        <button
                            type="button"
                            className={`${domains.length === 1 ? 'w-0' : 'w-[50%]'} h-full py-1 rounded-[6px] text-lg ${
                                selectedDomain === domains[1] ? 'bg-white text-black' : ' text-white'
                            }`}
                            onClick={() => setSelectedDomain(domains[1])}
                        >
                            {domains[1]}
                        </button>
                    </div>
                )}
                {techTasks && techTasks.length > 0 && selectedDomain === 'Tech' && (
                    <DomainTask domain={'tech'} tasks={techTasks} />
                )}
                {designTasks && designTasks.length > 0 && selectedDomain === 'Design' && (
                    <DomainTask domain={'design'} tasks={designTasks} />
                )}
                {videoTasks && videoTasks.length > 0 && selectedDomain === 'Video' && (
                    <DomainTask domain={'video'} tasks={videoTasks} />
                )}
                {managementTasks && managementTasks.length > 0 && selectedDomain === 'Management' && (
                    <DomainTask domain={'management'} tasks={managementTasks} />
                )}
                {!techTasks.length && !designTasks.length && (
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <p className="text-xl font-medium">The tasks are not available yet!</p>
                        <Link href="/" passHref>
                            <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                Home
                            </button>
                        </Link>
                    </div>
                )}
                <Link
                    href="https://discord.com/invite/d6WS4vt6bz"
                    className="discord bg-[#5d6af2] w-fit rounded-full py-2 px-4 flex items-center gap-4 justify-between fixed bottom-4 md:bottom-8 right-2 md:right-8 scale-75 md:scale-100 active:scale-[70%] active:md:scale-90 transition-all duration-100 ease-linear"
                    style={{ userSelect: 'none' }}
                >
                    <p className="font-medium text-lg text-nowrap flex flex-col">
                        <span>Need Help?</span>
                        {/* <span className="text-sm -mt-1">Join Discord!</span> */}
                    </p>
                    <Image
                        src={`/assets/discord-logo.png`}
                        alt="domain"
                        height={25}
                        width={30}
                        priority={true}
                        className=""
                    />
                </Link>
            </div>
        </>
    );
};

export default Tasks;

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const res = await getTasks({ cookies });
    const { username } = cookies;
    const techTasks = res ? res.filter((e) => e.domain === 'tech') : [];
    const designTasks = res ? res.filter((e) => e.domain === 'design') : [];
    const videoTasks = res ? res.filter((e) => e.domain === 'video') : [];
    const managementTasks = res ? res.filter((e) => e.domain === 'management') : [];
    return { props: { techTasks, designTasks, username, videoTasks, managementTasks } };
}
