import React from "react";
import "./header.css";
import cowrywise from "../../images/cowrywise.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";

const Header = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className=' flex justify-between bg-white text-sm items-center text-[#4b5563] px-4 py-4'>
      <div className=''>
        <img src={cowrywise} alt='cowrywise' className='h-10' />
      </div>
      <div className=''>
        <ul className='hidden md:flex'>
          <li className='p-4 flex'>
            Personal
            <MdArrowDropDown className='mt-1' />
          </li>
          <li className='p-4 flex'>
            Business
            <MdArrowDropDown className='mt-1' />
          </li>
          <li className='p-4 flex'>
            Developer <MdArrowDropDown className='mt-1' />
          </li>
          <li className='p-4 flex'>Learn</li>
        </ul>
      </div>
      <div className='justify-between hidden md:flex'>
        <div className='p-4 text-blue-600'>Log In</div>
        <div className=''>
          <div className='p-4 bg-blue-600 text-white rounded-lg  h-10 pt-2.5 mt-1.5'>
            SignUp For Free
          </div>
        </div>
      </div>
      <div onClick={handleNav} className='block md:hidden  '>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[90%] h-[100%]  border-white ease-in-out duration-500 px-5 bg-[#0066F5] text-white "
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <li className='p-4 mt-12 border-r-gray-200  flex text-3xl cursor-pointer hover:text-gray-300'>
          Personal
          <MdArrowDropDown className='mt-1 ' />
        </li>
        <li className='p-4  border-r-gray-200  flex text-3xl cursor-pointer hover:text-gray-300'>
          Business
          <MdArrowDropDown className='mt-1 ' />
        </li>
        <li className='p-4  border-r-gray-200 flex text-3xl cursor-pointer hover:text-gray-300'>
          Developer
          <MdArrowDropDown className='mt-1' />
        </li>

        <li className='p-2 pl-4 mt-7 border-r-gray-200 flex cursor-pointer text-gray-300 text-xl font-light'>
          Sign Up
        </li>
        <li className='p-2 pl-4 border-r-gray-200 flex cursor-pointer text-gray-300 text-xl font-light'>
          Log In
        </li>
        <li className='p-2 pl-4 border-r-gray-200 flex cursor-pointer text-gray-300 text-xl font-light'>
          About
        </li>
        <li className='p-2 pl-4 border-r-gray-200 flex cursor-pointer text-gray-300 text-xl font-light'>
          FAQ's
        </li>
        <li className='p-2 pl-4 border-r-gray-200 flex cursor-pointer text-gray-300 text-xl font-light'>
          Security
        </li>
        <li className='p-2 pl-4  border-r-gray-200 flex cursor-pointer text-gray-300 text-xl font-light'>
          Learn
        </li>
      </ul>
    </div>
  );
};

export default Header;
