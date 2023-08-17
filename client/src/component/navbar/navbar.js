import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
import { SearchIcon, ShoppingBagIcon, UserIcon } from "../../assets/icons/icon";
import { useSelector } from "react-redux";
import { useState } from "react";
import Ad from "./Ad";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { dark } = useSelector((state) => state.ui);

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav
      id='top-nav'
      className={`bg-primary text-white ${
        dark ? "md:bg-primary" : "md:bg-white md:text-black"
      }`}
    >
      <Ad />
      <div className='flex items-center flex-col md:flex-row md:justify-between'>
        <div className='logo'>
          {user && (
            <div className='icons'>
              <button title={user.name}>
                <Link to='/user/settings'>
                  <UserIcon className='w-5 h-5 sm:w-6 sm:h-6' />
                </Link>
              </button>
            </div>
          )}
          <h2>
            <Link to='/'>
              ayeti adorn<span>.</span>
            </Link>
          </h2>

          <div className='flex justify-evenly items-center gap-2 md:hidden'>
            <button>
              <Link to='/search'>
                <SearchIcon className='w-5 h-5 sm:w-6 sm:h-6' />
              </Link>
            </button>
            <button>
              <Link to='/cart'>
                <ShoppingBagIcon className='w-5 h-5 sm:w-6 sm:h-6' />
              </Link>
            </button>
            <div
              className={`toggle-menu ${isNavOpen ? "open" : "close"}`}
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <div className='line mb-1'></div>
              <div className='line'></div>
            </div>
          </div>
        </div>
        <div
          className={`navlinks-container bg-primary ${
            dark ? "md:bg-primary" : "md:bg-white"
          } ${isNavOpen ? "max-h-full overflow-hidden" : "max-h-0"}`}
        >
          <ul
            className={`navlinks ${
              dark ? "md:bg-primary text-white" : "md:bg-white text-black"
            }`}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <NavLink to='/'>
              <li>home</li>
            </NavLink>

            <NavLink to='/products'>
              <li>products</li>
            </NavLink>

            <NavLink to='/stores'>
              <li>stores</li>
            </NavLink>

            <NavLink to='/contact'>
              <li>contact</li>
            </NavLink>

            {!user && (
              <li className='auth'>
                <Link to='/auth'>login / register</Link>
              </li>
            )}
          </ul>
          <div className='options'>
            <button className='bag'>
              <Link to='/cart'>
                <ShoppingBagIcon className='w-5 h-5 sm:w-6 sm:h-6' />
              </Link>
            </button>

            <button className='search'>
              <Link to='/search'>
                <SearchIcon className='w-5 h-5 sm:w-6 sm:h-6' />
              </Link>
            </button>

            {user && (
              <button className='user' title={user.name}>
                <Link to='/user/settings'>
                  <UserIcon className='w-5 h-5 sm:w-6 sm:h-6' />
                </Link>
              </button>
            )}
            {!user && (
              <div className='auth'>
                <button>
                  <Link to='/auth'>sign-up</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
