import "./user.css";
import { useState } from "react";
// Hooks
import useTitle from "../../hooks/useTitle";
// Components
import { CloseIcon, HamburgerIcon, LogoutIcon } from "../../assets/icons/icon";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { logoutUser } from "../../features/user/userSlice";

const User = () => {
  useTitle("User");
  const { user } = useSelector((store) => store.user);
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  console.log(user);
  if (!user) {
    return <Navigate to='/' />;
  }

  return (
    <section id='user' className='relative sm:grid grid-cols-12'>
      <aside
        className={`absolute sm:static transition-all duration-300  sm:col-span-3 h-screen bg-blue-500 py-4 ${
          openNav ? "left-0 w-3/5" : "-left-full"
        }`}
      >
        {/* logo Here maybe?? AYETI ADORN*/}
        <h4 className='title mb-10 flex flex-col md:flex-row justify-center items-center gap-5'>
          <img
            className='h-24 w-24 rounded-full'
            src='http://localhost:3000/img.png'
            alt='name'
          />
          <p className='font-semibold text-white capitalize'>abdullahi fahm</p>
        </h4>

        <nav className='bg-transparent p-0'>
          <ul className='ml-4 w-full bg-transparent'>
            <NavLink to='/user/settings'>
              <li>Settings</li>
            </NavLink>

            <NavLink to='/user/edit-profile'>
              <li>Edit profile</li>
            </NavLink>

            <NavLink to='/user/wishlist'>
              <li>Wishlist</li>
            </NavLink>

            <NavLink to='/user/store'>
              <li>My Store</li>
            </NavLink>

            <NavLink to='/user/products'>
              <li>My Products</li>
            </NavLink>

            <NavLink to='/user/orders'>
              <li>Orders</li>
            </NavLink>
          </ul>
        </nav>

        <button
          className='mt-3 bg-tomato text-white flex justify-center items-center my-0 mx-auto px-3 py-2 w-3/4 rounded-md'
          onClick={() => dispatch(logoutUser())}
        >
          <span>logout</span> <LogoutIcon />
        </button>
      </aside>
      <main className='sm:col-span-9 h-screen'>
        <button
          className='sm:hidden bg-bkg text-secondary p-4 rounded-full m-3 float-right'
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        <div className='m-4'>
          <Routes>
            <Route
              path='settings'
              element={<div className='text-xl '>Settings</div>}
            />
            <Route
              path='edit-profile'
              element={<div className='text-xl '>Edit Profile</div>}
            />
            <Route
              path='wishlist'
              element={<div className='text-xl '>WishList</div>}
            />
            <Route
              path='store'
              element={<div className='text-xl '>My Store</div>}
            />
            <Route
              path='products'
              element={<div className='text-xl '>My Products</div>}
            />
            <Route
              path='orders'
              element={<div className='text-xl '>Orders</div>}
            />
          </Routes>
        </div>
      </main>
    </section>
  );
};

export default User;
