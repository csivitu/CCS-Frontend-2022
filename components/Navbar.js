import React, { useState } from 'react';
import Link from 'next/link';
import TriColor from '../public/assets/csi_logo_tricolor.svg';
import Image from 'next/image';

const Navbar = ({ loggedIn }) => {

  const [viewMobileMenu, setViewMobileMenu] = useState(false);
  
  return (
    <nav className="sticky top-0 px-3 sm:px-4 py-2.5 w-full bg-gray-dark z-30">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="" passHref>
          <button className="self-center text-4xl whitespace-nowrap font-bold flex items-center gap-2"><span><TriColor /></span> CCS</button>
        </Link>
        <div className="hidden md:flex gap-10">
          <Link href="/user/projects" passHref>
            <button className="font-light transition ease-linear bg-transparent py-3 px-5  hover:underline rounded text-peach">
              TASKS
            </button>
          </Link>
          { loggedIn  ? 
          <div className='flex items-center gap-2'>
            <Link href="/user/dashboard" passHref><a className='uppercase text-peach hover:underline font-thin'>Sourish Gupta</a></Link>
            <div className="bg-peach rounded-md w-8 h-8">
              <Image
                src="https://avatars.dicebear.com/api/croodles-neutral/sourish.svg"
                alt="avatar"
                width={40}
                height={40}
              />
            </div>
          </div> :
          <Link href="/register" passHref>
            <button className="transition ease-linear py-3 px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
              REGISTER NOW
            </button>
          </Link>}
        </div>
        <button onClick={() => {
          setViewMobileMenu(!viewMobileMenu)
        }} className="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:ring-2  text-peach  focus:ring-peach">
          {viewMobileMenu ? <svg className="md:hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg> : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>}
        </button>
        {viewMobileMenu ? <div className="w-full md:hidden" id="mobile-menu">
          <ul className="flex flex-col mt-4 list-none items-center">
            <li>
              <Link href="/user/projects" className="block py-2 pr-4 pl-3 text-peach border-b hover:text-white  border-peach">TASKS</Link>
            </li>
            <li>
              {loggedIn ? 
              <Link href="/user/dashboard" className="block py-2 pr-4 pl-3 text-peach border-b hover:text-white  border-peach">DASHBOARD</Link> 
              :
              <Link href="/register" className="block py-2 pr-4 pl-3 text-peach border-b hover:text-white  border-peach">REGISTER NOW</Link>}
            </li>
          </ul>
        </div> : null}
      </div>
    </nav>
  )
};

export default Navbar;
