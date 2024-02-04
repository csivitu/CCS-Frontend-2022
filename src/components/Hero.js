import Image from 'next/image';
import React, { useState } from 'react';
import L_Piece from '../../public/assets/piece_l.svg';
import R_Piece from '../../public/assets/piece_r.svg';
import M_Piece from '../../public/assets/piece_m.svg';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import Countdown from 'react-countdown';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

const Hero = ({ loggedIn }) => {
    const endDate = process.env.NEXT_PUBLIC_END_DATE;

    const leftPos = useSpring({ x: 0, y: 0 });
    const RightPos = useSpring({ x: 0, y: 0 });

    const bindLeftPos = useDrag((params) => {
        leftPos.x.set(params.offset[0]);
        leftPos.y.set(params.offset[1]);
    });

    const bindRightPos = useDrag((params) => {
        RightPos.x.set(params.offset[0]);
        RightPos.y.set(params.offset[1]);
    });

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <>
                    <p className="font-extralight">
                        <span className="animate-pulse h-2 w-2 md:h-4 md:w-4 bg-yellow-500 inline-block rounded-full mr-2" />
                        We are evaluating <span className="font-bold">Round 1</span>
                    </p>
                    {/* <div className="ml-4 md:ml-6">
                        <p className="font-extralight whitespace-nowrap">
                            <span className="font-bold text-gray-500">Round 1 completed!</span>
                        </p>
                    </div> */}
                </>
            );
        } else {
            return (
                <>
                    <p className="font-extralight">
                        <span className="animate-pulse h-2 w-2 md:h-4 md:w-4 bg-video inline-block rounded-full mr-2" />
                        <span className="font-bold">Round 1</span> is LIVE
                    </p>
                    <div className="ml-4 md:ml-6">
                        {days === 0 ? (
                            <>
                                <p className="font-extralight whitespace-nowrap">
                                    Ends in{' '}
                                    <span className="text-tech font-bold">
                                        {hours} {hours === 1 ? 'hour' : 'hours'}
                                    </span>
                                </p>
                                <p className="font-extralight whitespace-nowrap">
                                    {minutes} mins, {seconds} secs
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="font-extralight whitespace-nowrap">
                                    Ends in{' '}
                                    <span className="text-tech font-bold">
                                        {days} {days === 1 ? 'day' : 'days'}
                                    </span>
                                </p>
                                <p className="font-extralight whitespace-nowrap">
                                    {hours} hours, {minutes} mins, {seconds} secs
                                </p>
                            </>
                        )}
                    </div>
                </>
            );
        }
    };
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [proofSubmit, setProofSubmit] = useState(false);
    return (
        <section
            id="Hero"
            className="flex w-full h-screen relative items-center justify-center bg-grid bg-no-repeat bg-cover bg-center overflow-hidden"
        >
            {!proofSubmit && (
                <div className="banner w-[90%] md:w-fit px-2 py-2 bg-red-500 rounded-xl text-sm absolute top-4 md:right-4 font-medium">
                    Due to Re-enrollments, we would appreciate if you can share your proof of registration
                    <button
                        type="button"
                        className=" text-red-500 bg-white p-1 rounded-lg ml-4 px-2"
                        onClick={() => setOpenUploadModal(true)}
                    >
                        Upload
                    </button>
                </div>
            )}
            {openUploadModal && (
                <>
                    <div className="upload-modal w-[80%] md:w-[35%] h-fit fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#131313] z-[150] rounded-3xl shadow-xl p-4 border-2 border-white">
                        <p className="text-white text-3xl">
                            Upload a screenshot of your VTOP page, showing you have enrolled in CSI{' '}
                        </p>
                        <div className="w-full mt-6">
                            <input
                                type="file"
                                name=""
                                id="upload-proof"
                                hidden
                                onChange={() => {
                                    setOpenUploadModal(false);
                                    setProofSubmit(true);
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    document.getElementById('upload-proof').click();
                                }}
                                className="bg-white py-2 px-12 rounded-lg text-black text-xl"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                    <div
                        className="upload-modal-overlay bg-[rgba(0,0,0,0.3)] z-[140] w-full h-full fixed top-0 left-0"
                        onClick={() => setOpenUploadModal(false)}
                    ></div>
                </>
            )}
            <div className="floater animate-float_delay absolute left-2 md:left-5 bottom-14 md:bottom-10">
                <animated.div
                    {...bindLeftPos()}
                    style={{
                        x: leftPos.x,
                        y: leftPos.y,
                    }}
                    className="z-50 cursor-pointer"
                >
                    <L_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
            </div>
            <div className="floater  animate-float absolute right-2 md:right-5 top-16">
                <animated.div
                    className="cursor-pointer z-50"
                    {...bindRightPos()}
                    style={{
                        x: RightPos.x,
                        y: RightPos.y,
                    }}
                >
                    <R_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <div className="w-1/3 ml-1 md:ml-2">
                        <Image src="/assets/csiBanner.webp" alt="CSI Logo" height="48" width="248" />
                    </div>
                    <div>
                        <p className="font-bold align-middle text-4xl md:text-6xl lg:text-8xl relative pointer-events-none">
                            CORE
                            <br />
                            COMMITTEE
                            <br />
                            INTERACTIONS
                            <M_Piece className="absolute bottom-5 md:bottom-8 lg:bottom-10 left-12 md:left-20 lg:left-32 w-8 md:w-12 lg:w-20" />
                        </p>
                    </div>
                    <div className="mt-7 md:mt-10 lg:mt-20 w-full flex flex-col md:flex-row items-center gap-4 md:gap-2">
                        <div className="flex flex-col grow gap-2 text-md md:text-xl lg:text-2xl">
                            <Countdown date={new Date(endDate)} renderer={renderer} zeroPadTime={3} />
                        </div>
                        <div>
                            {/* <Link href="/results" passHref shallow={true}>
                                <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                    RESULTS
                                </button>
                            </Link> */}
                            {loggedIn ? (
                                <>
                                    {new Date() > new Date(endDate) ? (
                                        <Link href="/user/tasks" passHref>
                                            <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                                TASKS
                                            </button>
                                        </Link>
                                    ) : (
                                        <ScrollLink to="domains" smooth={true} duration={500} spy={true} exact="true">
                                            <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                                DOMAINS
                                            </button>
                                        </ScrollLink>
                                    )}
                                </>
                            ) : (
                                <Link href="/register" passHref shallow={true}>
                                    <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                        REGISTER
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
