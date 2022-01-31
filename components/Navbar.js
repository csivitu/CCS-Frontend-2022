import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {

  const [viewMobileMenu, setViewMobileMenu] = useState(false);
  
  return (
    <nav className="sticky top-0 px-10 sm:px-4 py-2.5 w-full">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="" passHref>
          <button className="self-center text-4xl whitespace-nowrap font-bold">CCS</button>
        </Link>
        <div className="hidden md:flex gap-10">
          <Link href="/projects" passHref>
            <button className="font-light transition ease-linear bg-transparent py-3 px-5  hover:underline rounded text-peach">
              PROJECTS
            </button>
          </Link>
          <Link href="/signup" passHref>
            <button className="transition ease-linear py-3 px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
              REGISTER NOW
            </button>
          </Link>
        </div>
        <button onClick={() => {
          setViewMobileMenu(!viewMobileMenu)
        }} className="inline-flex items-center p-2 text-sm rounded-lg md:hidden focus:ring-2  text-peach  focus:ring-peach">
          {viewMobileMenu ? <svg className="md:hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg> : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>}
        </button>
        {viewMobileMenu ? <div className="w-full md:hidden" id="mobile-menu">
          <ul className="flex flex-col mt-4 list-none">
            <li>
              <Link href="/projects" className="block py-2 pr-4 pl-3 text-peach border-b hover:text-white  border-peach">PROJECTS</Link>
            </li>
            <li>
              <Link href="/signup" className="block py-2 pr-4 pl-3 text-peach border-b hover:text-white  border-peach">REGISTER NOW</Link>
            </li>
          </ul>
        </div> : null}
      </div>
    </nav>
  )
};

export default Navbar;
