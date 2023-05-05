import "./navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SearchIcon, ShoppingBagIcon, UserIcon } from "../../assets/icons/icon";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../../features.js/ui/uiSlice";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isNavOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  return (
    <nav>
      <div className='logo'>
        {isLoggedIn && (
          <div className='icons'>
            <button>
              <UserIcon />
            </button>
          </div>
        )}
        <h2>
          ayeti adorn<span>.</span>
        </h2>

        <div className='flex justify-evenly items-center gap-2 md:hidden'>
          <button>
            <SearchIcon />
          </button>
          <button>
            <ShoppingBagIcon />
          </button>
          <div
            className={`toggle-menu ${isNavOpen ? "open" : "close"}`}
            onClick={() => dispatch(toggleNavbar())}
          >
            <div className='line mb-1'></div>
            <div className='line'></div>
          </div>
        </div>
      </div>
      <div
        className={`navlinks-container ${isNavOpen ? "max-h-full" : "max-h-0"}`}
      >
        <ul className='navlinks'>
          <NavLink to='/'>
            <li>home</li>
          </NavLink>

          <NavLink to='stores'>
            <li>stores</li>
          </NavLink>

          <NavLink to='about'>
            <li>about</li>
          </NavLink>

          <NavLink to='contact'>
            <li>contact</li>
          </NavLink>

          {!isLoggedIn && <li className='auth'>login / register</li>}
        </ul>
        <div className='options'>
          <button className='bag'>
            <ShoppingBagIcon />
          </button>

          <button className='search'>
            <SearchIcon />
          </button>

          {isLoggedIn && (
            <button className='user' onClick={() => setIsLoggedIn(!isLoggedIn)}>
              <UserIcon />
            </button>
          )}
          {!isLoggedIn && (
            <div className='auth'>
              <button onClick={() => setIsLoggedIn(!isLoggedIn)}>login</button>
              <button>sign-up</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
