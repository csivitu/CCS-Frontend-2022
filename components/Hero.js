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
                <div className='ml-4 md:ml-6'>
                    <p className='font-extralight whitespace-nowrap'>Ends in <span className="text-tech font-bold">{days} days</span></p>
                    <p className='font-extralight whitespace-nowrap'>{hours} hours, {minutes} mins, {seconds} secs</p>
                </div>
            )
        }
    };
    return (
        <section id="Hero" className="flex w-full h-screen relative items-center justify-center bg-grid md:bg-none bg-no-repeat bg-cover bg-center">
            {/* items-center justify-center */}
            <div className="absolute left-2 md:left-5 bottom-14 md:bottom-10">
                <L_Piece className="w-32 md:w-44 lg:w-52" />
            </div>
            <div className="absolute right-2 md:right-5 top-10">
                <R_Piece className="w-32 md:w-44 lg:w-52" />
            </div>
            <div className="flex flex-col items-center justify-center">
                <div>
                    <div className="w-1/3 ml-1 md:ml-2">
                        <Image src="/assets/CSI_Logo.png" alt="CSI Logo" height="48" width="248" />
                    </div>
                    <div>
                        <p className="font-bold align-middle text-4xl md:text-6xl lg:text-8xl relative">
                            CORE<br />COMMITTEE<br />SELECTIONS 
                            <M_Piece className="absolute bottom-5 md:bottom-8 lg:bottom-10 left-12 md:left-20 lg:left-32 w-8 md:w-12 lg:w-20" />
                        </p>
                    </div>
                    <div className='mt-7 md:mt-10 lg:mt-20 w-full flex flex-col md:flex-row items-center gap-4 md:gap-2'>
                        <div className="flex flex-col grow gap-2 text-md md:text-xl lg:text-2xl">
                            <p className='font-extralight'>
                                <span className="animate-pulse h-2 w-2 md:h-4 md:w-4 bg-video inline-block rounded-full mr-2" />
                                <span className='font-bold'>Round 1</span> is LIVE</p>
                            <Countdown
                                date={new Date("Feb 12, 2022 00:00:00")}
                                renderer={renderer}
                            />
                        </div>
                        <div className=''>
                            <Link href="/signup" passHref >
                                <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                    REGISTER NOW
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
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
