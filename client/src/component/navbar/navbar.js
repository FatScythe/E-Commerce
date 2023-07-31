import "./navbar.css";
import { NavLink, Link } from "react-router-dom";
import { SearchIcon, ShoppingBagIcon, UserIcon } from "../../assets/icons/icon";
import { useSelector } from "react-redux";
import { useState } from "react";
import Ad from "./Ad";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav id='top-nav'>
      <Ad />
      <div className='flex items-center flex-col md:flex-row md:justify-between'>
        <div className='logo'>
          {user && (
            <div className='icons'>
              <button title={user.name}>
                <Link to='/user/settings'>
                  <UserIcon />
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
                <SearchIcon />
              </Link>
            </button>
            <button>
              <Link to='/cart'>
                <ShoppingBagIcon />
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
          className={`navlinks-container ${
            isNavOpen ? "max-h-full overflow-hidden" : "max-h-0"
          }`}
        >
          <ul className='navlinks' onClick={() => setIsNavOpen(!isNavOpen)}>
            <NavLink to='/'>
              <li>home</li>
            </NavLink>

            <NavLink to='/products'>
              <li>products</li>
            </NavLink>

            <NavLink to='/about'>
              <li>about</li>
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
                <ShoppingBagIcon />
              </Link>
            </button>

            <button className='search'>
              <Link to='/search'>
                <SearchIcon />
              </Link>
            </button>

            {user && (
              <button className='user' title={user.name}>
                <Link to='/user/settings'>
                  <UserIcon />
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
