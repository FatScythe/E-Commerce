// Router
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
// Component
import {
  ChevronLeft,
  UserIcon,
  ShoppingBagIcon,
  SearchIcon,
  StoreIcon,
} from "../../assets/icons/icon";
// Redux
import { useSelector } from "react-redux";

const NotNav = ({ navLinks, name }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='no-nav-header sticky top-0 bg-white mt-2 md:mt-6 mb-8 flex justify-between items-center'>
      <div className='flex md:gap-4 md:basis-1/2 justify-between items-center'>
        <button onClick={() => navigate(-1)}>
          <div
            className='back md:bg-white md:shadow-xl md:hover:shadow-inner cursor-pointer md:p-4 w-fit rounded-full'
            title='back-home'
          >
            <span>
              <ChevronLeft />
            </span>
          </div>
        </button>

        <div className='page-name'>
          <h4 className='text-base capitalize md:font-bold md:text-lg'>
            {name || location.pathname.slice(1)}
          </h4>
        </div>
      </div>

      <div className='options flex justify-between items-center gap-4'>
        {navLinks.cart && (
          <Link to='/cart' title='cart'>
            <ShoppingBagIcon />
          </Link>
        )}
        {navLinks.search && (
          <Link to='/search' title='search'>
            <SearchIcon />
          </Link>
        )}
        {navLinks.store && (
          <Link to='/stores' title='stores'>
            <StoreIcon />
          </Link>
        )}
        {navLinks.auth && <Auth />}
      </div>
    </div>
  );
};

export default NotNav;

const Auth = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <>
      {user ? (
        <Link to='/user' title='user'>
          <UserIcon />
        </Link>
      ) : (
        <Link to='/auth' title='Sign-In'>
          <button>Sign-In</button>
        </Link>
      )}
    </>
  );
};
