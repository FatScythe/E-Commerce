// Router
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

const NotNav = ({ navLinks }) => {
  const location = useLocation();
  return (
    <div className='no-nav-header mt-2 mx-2 md:mt-6 mb-8 flex justify-between items-center'>
      <div className='flex gap-4 md:basis-1/2 justify-between items-center'>
        <div
          className='back bg-white shadow-xl hover:shadow-inner cursor-pointer p-2 md:p-4 w-fit rounded-full'
          title='back-home'
        >
          <Link to='/'>
            <span>
              <ChevronLeft />
            </span>
          </Link>
        </div>

        <div className='page-name'>
          <h4 className='text-base capitalize md:font-bold md:text-lg'>
            {location.pathname.slice(1)}
          </h4>
        </div>
      </div>

      <div className='options flex justify-between items-center gap-4'>
        {navLinks.auth && <Auth />}
        {navLinks.cart && (
          <Link to='/cart'>
            <ShoppingBagIcon />
          </Link>
        )}
        {navLinks.search && (
          <Link to='/search'>
            <SearchIcon />
          </Link>
        )}
        {navLinks.store && (
          <Link to='/stores'>
            <StoreIcon />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotNav;

const Auth = () => {
  const { isLoggedIn } = useSelector((store) => store.ui);

  return (
    <>
      {isLoggedIn ? (
        <Link to='/user'>
          <UserIcon />
        </Link>
      ) : (
        <Link to='/auth'>
          <button>Login / Register</button>
        </Link>
      )}
    </>
  );
};
