import Head from 'next/head';
import Link from 'next/link';
import L_Piece from '../../../public/assets/piece_l.svg';
import R_Piece from '../../../public/assets/piece_r.svg';
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from '@use-gesture/react'

const Tasks = () => {
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
            <div className="flex flex-col items-center justify-center h-screen gap-2">
                <animated.div
                    {...bindLeftPos()}
                    style={{
                        x: leftPos.x,
                        y: leftPos.y,
                    }}
                    className="absolute left-2 md:left-5 bottom-14 md:bottom-10 z-50 cursor-pointer"
                >
                    <L_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
                <animated.div className="absolute right-2 md:right-5 top-10 cursor-pointer z-50"
                    {...bindRightPos()}
                    style={{
                        x: RightPos.x,
                        y: RightPos.y,
                    }}>
                    <R_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
                <p className="text-center text-xl">The tasks will be made available to you shortly.</p>
                <p className="text-center text-xl"> In the meantime, please keep an eye out on your email for results regarding Round 1.</p>
                <p className="text-center text-xl"> You can also follow us on <a href="https://www.instagram.com/csivitu/" target="_blank"
                    className="text-peach underline font-semibold"
                    rel="noreferrer" >Instagram</a> to stay updated.</p>
                <Link href="/" passHref>
                    <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                        Home
                    </button>
                </Link>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default Tasks;
