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
    <nav>
      <div className={`options ${navIsOpen ? "max-h-80" : "max-h-0"}`}>
        <div className='logo'>
          <img src={cowrywise} alt='logo-cowrywise' />
          <div
            className={`toggle-menu ${navIsOpen ? "open" : "close"}`}
            onClick={handleToggleNav}
          >
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </div>
        <ul className={`links ${navIsOpen ? "open" : "close"}`}>
          <li>
            <span>Personal</span>
            <span>
              <MdArrowDropDown />
            </span>
          </li>
          <li>
            <span>Business</span>
            <span>
              <MdArrowDropDown />
            </span>
          </li>

          <li>
            <span>Developer</span>
            <span>
              <MdArrowDropDown />
            </span>
          </li>

          <li>Learn</li>
        </ul>
      </div>

      <div className='auth'>
        <button>Log In</button>
        <button> Sign Up For Free</button>
      </div>
    </nav>
  );
};

export default Navbar;
