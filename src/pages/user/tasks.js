import Head from 'next/head';
import { getTasks } from '../../lib/axios';
import nookies from 'nookies';
import DomainTask from '../../components/DomainTask';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

const Tasks = ({ techTasks, designTasks, username }) => {
    return (
        <>
            <Head>
                <title>CSI-CCS | Tasks</title>
            </Head>
            <Navbar tasksPage={true} loggedIn={true} username={username} dashBoard={true} />
            <div className="flex flex-col items-center justify-center gap-4 pt-10 select-text">
                {techTasks.length > 0 && <DomainTask domain={'tech'} tasks={techTasks} />}
                {designTasks.length > 0 && <DomainTask domain={'design'} tasks={designTasks} />}
                {!techTasks.length && !designTasks.length && (
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <p>Did not qualify for Round 2 for Tech or Design!</p>
                        <Link href="/" passHref>
                            <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                Home
                            </button>
                        </Link>
                    </div>
                )}
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

    return { props: { techTasks, designTasks, username } };
}
