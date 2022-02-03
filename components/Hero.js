import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from "../styles/Hero.module.css";

import L_Piece from '../public/assets/piece_l.svg';
import R_Piece from '../public/assets/piece_r.svg';
import M_Piece from '../public/assets/piece_m.svg';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll'
import Countdown from 'react-countdown';


const Hero = ({ loggedIn, check }) => {

    const renderer = ({ days, hours, minutes, seconds, completed, api: { isPaused, start, isStopped } }) => {
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
        <section id="Hero" className="flex w-full h-screen relative items-center justify-center bg-grid bg-no-repeat bg-cover bg-center">
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
                                zeroPadTime={3}
                            />
                        </div>
                        <div>
                            {loggedIn ? <ScrollLink
                                to='domains'
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                            >
                                <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                    DOMAINS
                                </button>
                            </ScrollLink>
                                : <Link href="/register" passHref shallow={true} >
                                    <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                        REGISTER NOW
                                    </button>
                                </Link>}
                        </div>
                    </div>
                </div>
            </div>
        </section>)
};

export default Hero;

export const getInitialProps = (ctx) => {
    console.log(ctx)
    return {
        props: { check: true }
    }
}