import "./user.css";
import { useState } from "react";
// Hooks
import useTitle from "../../hooks/useTitle";
// Components
import {
  BookmarkIcon,
  ChangeIcon,
  ChevronLeft,
  CloseIcon,
  HamburgerIcon,
  LogoutIcon,
  PencilIcon,
  ProductIcon,
  SettingsIcon,
  ShoppingBagIcon,
  StoreIcon,
  UserIcon,
} from "../../assets/icons/icon";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, NavLink, Link, Route, Routes } from "react-router-dom";
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

  console.log(user);

  if (!user) {
    return <Navigate to='/' />;
  }

  <Navigate to='/user/settings' />;
  return (
    <section id='user' className='relative sm:grid grid-cols-12'>
      <aside
        className={`absolute sm:static transition-all duration-300 sm:col-span-2  md:col-span-3 h-screen bg-blue-400 py-4 ${
          openNav ? "left-0 sm:left-full w-5/6 sm:w-full" : "-left-full"
        } z-20`}
      >
        <div className='back-home' title='home-page'>
          <Link to='/'>
            <ChevronLeft />
          </Link>
        </div>
        {/* logo Here maybe?? AYETI ADORN*/}
        <h4 className='title m-5 sm:mb-10 flex flex-col md:flex-row justify-center items-center gap-5 text-center'>
          <img
            className='h-20 sm:h-10 sm:w-10 md:h-32 w-20 md:w-32 rounded-full object-cover'
            src={user.avatar}
            alt={user.name}
            loading='eager'
          />
          <p className='font-semibold text-white capitalize'>{user.name}</p>
        </h4>

        <nav className='bg-transparent user-nav p-0 mb-10'>
          <ul
            className='pl-1 sm:pl-4 w-full bg-transparent'
            onClick={() => {
              setOpenNav(false);
            }}
          >
            <NavLink to='/user/settings'>
              <li>
                <span>
                  <SettingsIcon className='w-6 h-6' />
                </span>
                <span>Settings</span>
              </li>
            </NavLink>

            {user.role === "admin" && (
              <NavLink to='/user/users'>
                <li>
                  <span>
                    <UserIcon className='w-6 h-6' />
                  </span>
                  <span> All Users</span>
                </li>
              </NavLink>
            )}

            <NavLink to='/user/edit-profile'>
              <li>
                <span>
                  <PencilIcon className='w-6 h-6' />
                </span>
                <span> Edit profile</span>
              </li>
            </NavLink>

            <NavLink to='/user/change-password'>
              <li>
                <span>
                  <ChangeIcon className='w-6 h-6' />
                </span>
                <span>Change Password </span>
              </li>
            </NavLink>

            <NavLink to='/user/wishlist'>
              <li>
                <span>
                  <BookmarkIcon className='w-6 h-6' />
                </span>
                <span>Wishlist</span>
              </li>
            </NavLink>

            {user.role !== "user" && (
              <NavLink to='/user/store'>
                <li>
                  <span>
                    <StoreIcon />
                  </span>
                  <span>My Store</span>
                </li>
              </NavLink>
            )}

            {user.role !== "user" && (
              <NavLink to='/user/products'>
                <li>
                  <span>
                    <ProductIcon className='w-6 h-6' />
                  </span>
                  <span>
                    {user.role === "admin" ? "All Products" : "My Products"}
                  </span>
                </li>
              </NavLink>
            )}

            <NavLink to='/user/orders'>
              <li>
                <span>
                  <ShoppingBagIcon className='w-6 h-6' />
                </span>
                <span>Orders</span>
              </li>
            </NavLink>
          </ul>
        </nav>

        <button
          className='sm:mt-3 bg-tomato text-white flex justify-center items-center my-0 mx-auto px-3 py-2 w-3/4 rounded-md'
          onClick={() => dispatch(logoutUser())}
        >
          <span className='sm:hidden md:flex'>logout</span> <LogoutIcon />
        </button>
      </aside>
      <main className='relative w-full sm:col-span-10 md:col-span-9 sm:h-screen sm:overflow-y-scroll p-4'>
        <div className='float-right fixed z-50 px-3 right-0 top-4 w-fit'>
          <button
            className='sm:hidden bg-bkg text-secondary p-4 rounded-full'
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        <div>
          <Routes>
            <Route path='settings' element={<Settings />} />
            <Route path='users' element={<AllUsers user={user} />} />
            <Route path='edit-profile' element={<EditProfile user={user} />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='wishlist' element={<WishList user={user} />} />
            <Route path='products' element={<MyProducts user={user} />} />
            <Route path='store' element={<MyStore user={user} />} />
            <Route path='orders/*' element={<Orders user={user} />} />
          </Routes>
        </div>
      </main>
    </section>
  );
};

export default User;
