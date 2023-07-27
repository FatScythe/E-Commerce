import "./user.css";
import { useState } from "react";
// Hooks
import useTitle from "../../hooks/useTitle";
// Components
import {
  ChevronLeft,
  CloseIcon,
  HamburgerIcon,
  LogoutIcon,
} from "../../assets/icons/icon";
import { useSelector, useDispatch } from "react-redux";
import {
  Navigate,
  useLocation,
  NavLink,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import { logoutUser } from "../../features/user/userSlice";
// Components
import EditProfile from "./dashboard/editProfile";
import Settings from "./dashboard/settings";
import AllUsers from "./dashboard/allUsers";
import ChangePassword from "./dashboard/password";
import WishList from "./dashboard/wishlist";
import MyProducts from "./myProducts";
import MyStore from "./dashboard/myStore";
import Orders from "./dashboard/orders";

const User = () => {
  useTitle("User");
  const { user } = useSelector((store) => store.user);
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(user);

  if (!user) {
    return <Navigate to='/' />;
  }

  <Navigate to='/user/settings' />;
  return (
    <section id='user' className='relative sm:grid grid-cols-12'>
      <aside
        className={`absolute sm:static transition-all duration-300  sm:col-span-3 h-screen bg-blue-400 py-4 ${
          openNav ? "left-0 sm:left-full w-5/6 sm:w-full" : "-left-full"
        } z-20`}
      >
        <div className='back-home' title='home-page'>
          <Link to='/'>
            <ChevronLeft />
          </Link>
        </div>
        {/* logo Here maybe?? AYETI ADORN*/}
        <h4 className='title m-5 sm:mb-10 flex flex-col md:flex-row justify-center items-center gap-5'>
          <img
            className='h-20 sm:h-32 w-20 sm:w-32 rounded-full object-cover'
            src={user.avatar}
            alt={user.name}
            loading='eager'
          />
          <p className='font-semibold text-white capitalize'>{user.name}</p>
        </h4>

        <nav className='bg-transparent p-0'>
          <ul
            className='ml-4 w-full bg-transparent'
            onClick={() => {
              setOpenNav(false);
            }}
          >
            <NavLink to='/user/settings'>
              <li>Settings</li>
            </NavLink>

            {user.role === "admin" && (
              <NavLink to='/user/users'>
                <li>All Users</li>
              </NavLink>
            )}

            <NavLink to='/user/edit-profile'>
              <li>Edit profile</li>
            </NavLink>

            <NavLink to='/user/change-password'>
              <li>Change Password</li>
            </NavLink>

            <NavLink to='/user/wishlist'>
              <li>Wishlist</li>
            </NavLink>

            {user.role !== "user" && (
              <NavLink to='/user/store'>
                <li>My Store</li>
              </NavLink>
            )}

            {user.role !== "user" && (
              <NavLink to='/user/products'>
                <li>
                  {user.role === "admin" ? "All Products" : "My Products"}
                </li>
              </NavLink>
            )}

            <NavLink to='/user/orders'>
              <li>Orders</li>
            </NavLink>
          </ul>
        </nav>

        <button
          className='sm:mt-3 bg-tomato text-white flex justify-center items-center my-0 mx-auto px-3 py-2 w-3/4 rounded-md'
          onClick={() => dispatch(logoutUser())}
        >
          <span>logout</span> <LogoutIcon />
        </button>
      </aside>
      <main className='relative w-full sm:col-span-9 sm:h-screen sm:overflow-y-scroll p-4'>
        <div className='flex justify-between item-center sticky z-10 px-3 left-0 top-0 w-full'>
          <h2 className='capitalize font-semibold text-xl sm:text-2xl'>
            {location.pathname.slice(6) || "dashboard"}
          </h2>
          <button
            className='sm:hidden bg-bkg text-secondary p-4 rounded-full'
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        <div className='mt-20'>
          <Routes>
            <Route path='settings' element={<Settings />} />
            <Route path='users' element={<AllUsers user={user} />} />
            <Route path='edit-profile' element={<EditProfile user={user} />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='wishlist' element={<WishList user={user} />} />
            <Route path='products' element={<MyProducts user={user} />} />
            <Route path='store' element={<MyStore user={user} />} />
            <Route path='orders' element={<Orders user={user} />} />
          </Routes>
        </div>
      </main>
    </section>
  );
};

export default User;
