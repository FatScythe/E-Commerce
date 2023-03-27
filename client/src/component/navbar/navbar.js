import React from "react";
import "./navbar.css";
import cowrywise from "../../images/cowrywise.png";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";

const Navbar = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleToggleNav = () => {
    setNavIsOpen(!navIsOpen);
  };
  return (
    <nav className='md:mx-5 my-2 relative md:static bg-blue-500 md:max-h-max md:bg-transparent md:flex justify-between items-center'>
      <div
        className={`relative md:static bg-blue-500 md:max-h-max md:bg-transparent md:flex justify-between items-center ${
          navIsOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className='flex justify-between items-center bg-white'>
          <img className='w-48 h-14' src={cowrywise} alt='logo-cowrywise' />
          <div
            className={`toggle-menu z-50 w-10 flex md:hidden flex-col justify-center items-center gap-1 cursor-pointer ${
              navIsOpen ? "open" : "close"
            }`}
            onClick={handleToggleNav}
          >
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </div>
        <ul
          className={`links fixed top-0 left-0 right-0 bg-blue-500 pl-4 md:pl-0 md:bg-transparent md:static md:flex justify-between items-center gap-8 text-blue-500 transition-all md:transition-none duration-1000 ${
            navIsOpen ? "open" : "close"
          }`}
        >
          <li className='pt-16 md:pt-0 mb-9 md:mb-0 text-xl md:text-[1rem] cursor-pointer font-bold md:font-normal text-white md:text-[#7287A7] flex md:justify-between items-center'>
            <span>Personal</span>
            <span>
              <MdArrowDropDown />
            </span>
          </li>
          <li className='mb-9 md:mb-0 text-xl md:text-[1rem] cursor-pointer font-bold md:font-normal text-white md:text-[#7287A7] flex md:justify-between items-center'>
            <span>Business</span>
            <span>
              <MdArrowDropDown />
            </span>
          </li>

          <li className='mb-9 md:mb-0 text-xl md:text-[1rem] cursor-pointer font-bold md:font-normal text-white md:text-[#7287A7] flex md:justify-between items-center'>
            <span>Developer</span>
            <span>
              <MdArrowDropDown />
            </span>
          </li>

          <li className='mb-9 md:mb-0 text-xl md:text-[1rem] cursor-pointer font-bold md:font-normal text-white md:text-[#7287A7] flex md:justify-between items-center'>
            Learn
          </li>
        </ul>
      </div>

      <div className='gap-8 hidden md:flex justify-between items-center'>
        <button className='font-bold text-blue-500 block md:inline-block'>
          Log In
        </button>
        <button className='bg-blue-600 font-bold drop-shadow-md hover:drop-shadow-lg text-white rounded-md px-4 py-2'>
          Sign Up For Free
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
