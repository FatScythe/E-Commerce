import "./navbar.css";
// import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { SearchIcon, ShoppingBagIcon, UserIcon } from "../../assets/icons/icon";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbar } from "../../features.js/ui/uiSlice";

const Navbar = () => {
  // const [navBg, setNavBg] = useState(false);
  const { isNavOpen, isLoggedIn } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  // const changeNavBg = () => {
  //   window.scrollY >= 100 ? setNavBg(true) : setNavBg(false);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", changeNavBg);

  //   return () => window.removeEventListener("scroll", changeNavBg);
  // }, []);

  return (
    <nav className='container'>
      <div className='logo'>
        {isLoggedIn && (
          <div className='icons'>
            <button>
              <Link to='/user'>
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
            onClick={() => dispatch(toggleNavbar())}
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
        <ul className='navlinks' onClick={() => dispatch(toggleNavbar())}>
          <NavLink to='/'>
            <li>home</li>
          </NavLink>

          <NavLink to='products'>
            <li>products</li>
          </NavLink>

          <NavLink to='about'>
            <li>about</li>
          </NavLink>

          <NavLink to='contact'>
            <li>contact</li>
          </NavLink>

          {!isLoggedIn && (
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

          {isLoggedIn && (
            <button className='user'>
              <Link to='/user'>
                <UserIcon />
              </Link>
            </button>
          )}
          {!isLoggedIn && (
            <div className='auth'>
              <button>
                <Link to='/auth'>sign-up</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
