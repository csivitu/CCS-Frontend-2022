import Head from 'next/head';
import L_Piece from '../../../public/assets/piece_l.svg';
import R_Piece from '../../../public/assets/piece_r.svg';
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from '@use-gesture/react'
import { getTasks } from '../../lib/axios';
import nookies from 'nookies';
import DomainTask from '../../components/DomainTask';
import Navbar from '../../components/Navbar'

const Tasks = ({ techTasks, designTasks, username }) => {
    const leftPos = useSpring({ x: 0, y: 0 });
    const RightPos = useSpring({ x: 0, y: 0 });

    const bindLeftPos = useDrag((params) => {
        leftPos.x.set(params.offset[0]);
        leftPos.y.set(params.offset[1]);
    })

    const bindRightPos = useDrag((params) => {
        RightPos.x.set(params.offset[0]);
        RightPos.y.set(params.offset[1]);
    })
    return (
        <>
            <Head>
                <title>CSI-CCS | Tasks</title>
            </Head>
            <Navbar tasksPage={true} loggedIn={true} username={username} dashBoard={true} />
            <div className="flex flex-col items-center justify-center h-screen gap-2 overflow-hidden ">
                <animated.div
                    {...bindLeftPos()}
                    style={{
                        x: leftPos.x,
                        y: leftPos.y,
                    }}
                    className="absolute hidden md:block left-2 md:left-5 bottom-14 md:bottom-10 z-50 cursor-pointer"
                >
                    <L_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
                <animated.div className="absolute hidden md:block right-2 md:right-5 top-10 cursor-pointer z-50"
                    {...bindRightPos()}
                    style={{
                        x: RightPos.x,
                        y: RightPos.y,
                    }}>
                    <R_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
                <DomainTask domain={"tech"} tasks={techTasks} />
                <DomainTask domain={"design"} tasks={designTasks} />
            </div>
        </>
    );
};

export default Tasks;

export async function getServerSideProps(context) {
    const cookies = nookies.get(context);
    const res = await getTasks({ cookies });
    const { username } = cookies
    const techTasks = res.filter((e) => e.domain === "tech");
    const designTasks = res.filter((e) => e.domain === "design");
    return { props: { techTasks, designTasks, username } }
}
