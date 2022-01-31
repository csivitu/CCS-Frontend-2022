import Image from 'next/image';
import React from 'react';
import styles from "../styles/Hero.module.css";

import L_Piece from '../public/assets/piece_l.svg';
import R_Piece from '../public/assets/piece_r.svg';
import M_Piece from '../public/assets/piece_m.svg';

import Link from 'next/link';
import Countdown from 'react-countdown';


const Hero = () => {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <h1>Completed</h1>;
        } else {
            return (
                <div className='ml-6'>
                    <p className='text-xl sm:text-2xl font-extralight whitespace-nowrap'>Ends in <span className="text-tech font-bold">{days} days</span></p>
                    <p className='text-xl sm:text-2xl font-extralight whitespace-nowrap'>{hours} hours, {minutes} mins, {seconds} secs</p>
                </div>
            )
        }
    };
    return (
        <section id="Hero" className="flex w-full h-screen relative items-center justify-center ">
            {/* items-center justify-center */}
            <div className="w-1/4 h-full">
                <L_Piece className="w-4/5 lg:w-1/2 h-full translate-x-full translate-y-60" />
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div>
                    <div className="w-1/4 ml-3">
                        <Image src="/assets/CSI_Logo.png" alt="CSI Logo" height="48" width="248" />
                    </div>
                    <div>
                        <M_Piece className="absolute translate-x-40 translate-y-52" />
                        <p className="font-bold align-middle text-4xl md:text-7xl lg:text-9xl">CORE<br />COMMITTEE<br />SELECTIONS</p>
                    </div>
                    <div className='mt-20 w-full flex flex-col sm:flex-row'>
                        <div className="flex flex-col w-4/5 gap-2">
                            <p className='text-2xl font-extralight'>
                                <span className="h-4 w-4 bg-video inline-block rounded-full mr-2" />
                                <span className='font-bold'>Round 1</span> is LIVE</p>
                            <Countdown
                                date={new Date("Feb 13, 2022 00:00:00")}
                                renderer={renderer}
                            />
                        </div>
                        <div className='w-1/5 flex items-center justify-center'>
                            <Link href="/signup" passHref >
                                <button className="transition ease-linear py-3 px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                    REGISTER NOW
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-1/4 h-full">
                <R_Piece className="w-4/5 lg:w-1/2 h-full " />
            </div>
            {/* <div className="flex flex-col">
                <div>
                    <Image src="/assets/CSI_Logo.png" alt="CSI Logo" height="48" width="246" />
                </div>
                <L_Piece className="absolute w-auto h-40 lg:h-2/5 left-1 lg:left-56 top-3/4 lg:top-2/4 md:h-52 md:top-2/4" />
                <L_Piece className={styles.l_piece} />
                <R_Piece className={styles.r_piece} />
                <p className="font-bold align-middle text-6xl md:text-7xl lg:text-9xl">CORE<br />COMMITTEE<br />SELECTIONS</p>

            </div> */}


        </section>)
};

export default Hero;
