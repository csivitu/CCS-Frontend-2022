import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll';
import { ToastContext } from './ToastContext';
// import { useRouter } from 'next/router';

const Navbar = ({ loggedIn, username, dashBoard, tasksPage = false }) => {
    const { handleSnackOpen } = useContext(ToastContext);
    const [viewMobileMenu, setViewMobileMenu] = useState(false);
    // const router = useRouter();
    const handleTasks = () => {
        handleSnackOpen({
            message: 'Tasks will be made available to you on clearing round 1.',
            variant: 'warning',
        });
    };
    // const handleLogout = () => {
    //     router.push('/logout');
    // };
    return (
        <nav className="sticky top-0 px-3 sm:px-4 py-2.5 w-full bg-gray-dark z-30">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                {dashBoard ? (
                    <Link href="/" passHref>
                        <button className="self-center text-4xl whitespace-nowrap font-bold flex items-center gap-2 text-peach">
                            CCS
                        </button>
                    </Link>
                ) : (
                    <ScrollLink to="Hero" smooth={true} duration={500} spy={true} exact="true" offset={-80}>
                        <button className="self-center text-4xl whitespace-nowrap font-bold flex items-center gap-2 text-peach">
                            CCS
                        </button>
                    </ScrollLink>
                )}
                <div className="hidden md:flex gap-10">
                    {tasksPage ? null :
                        <Link href="/user/tasks" passHref>
                            <a className="font-light transition ease-linear bg-transparent py-3 px-5  hover:underline rounded text-peach">
                                TASKS
                            </a>
                        </Link>}
                    {loggedIn ? (
                        <div className="flex items-center gap-2">
                            <Link href="/user/dashboard" passHref>
                                <a className="uppercase text-peach hover:underline font-thin">{username}</a>
                            </Link>
                            <div className="bg-peach rounded-md w-8 h-8">
                                <Image
                                    src={`https://avatars.dicebear.com/api/croodles-neutral/${username}.svg`}
                                    alt="avatar"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            {/* <div>
                                <button onClick={handleLogout}>Logout</button>
                            </div> */}
                        </div>
                    ) : (
                        <Link href="/login" passHref>
                            <button className="transition ease-linear py-3 px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                                LOGIN
                            </button>
                        </Link>
                    )}
                </div>

                <button
                    onClick={() => {
                        setViewMobileMenu(!viewMobileMenu);
                    }}
                    className="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:ring-2  text-peach  focus:ring-peach"
                >
                    {viewMobileMenu ? (
                        <svg
                            className="md:hidden w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    )}
                </button>
                {viewMobileMenu ? (
                    <div className="w-full md:hidden" id="mobile-menu">
                        <ul className="flex flex-col mt-4 list-none items-center text-center">
                            {tasksPage ? null : <li>
                                <Link
                                    href="/user/tasks"
                                    onClick={handleTasks}
                                    passHref
                                >
                                    <a className="block py-2 px-4 text-peach hover:text-white  border-peach">
                                        TASKS
                                    </a>
                                </Link>
                            </li>}
                            <li>
                                {loggedIn ? (
                                    <>
                                        <Link href="/user/dashboard">
                                            <a className="block py-2 px-4 text-peach hover:text-white  border-peach">
                                                PROFILE
                                            </a>
                                        </Link>
                                        {/* <button onClick={handleLogout}>
                                            <a className="block py-2 px-4 text-peach hover:text-white border-peach">
                                                LOGOUT
                                            </a>
                                        </button> */}
                                    </>
                                ) : (
                                    <Link href="/login">
                                        <a className="block py-2 px-4 text-peach hover:text-white  border-peach">
                                            LOGIN NOW
                                        </a>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

export default Navbar;
