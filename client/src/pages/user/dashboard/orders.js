import { NavLink, Routes, Route, useNavigate, Link } from "react-router-dom";
import "../user.css";
import { useEffect } from "react";
// Hook
import useSWR from "swr";
// Redux
import { useSelector } from "react-redux";
// Utils
import url from "../../../utils/url";

const Orders = ({ user }) => {
  const navigate = useNavigate();
  const { dark } = useSelector((store) => store.ui);

  useEffect(() => {
    navigate("/user/orders/purchased");
  }, []);

  return (
    <section id='order' className='container'>
      <h2
        className={`capitalize font-semibold text-xl sm:text-2xl mb-10 ${
          dark ? "text-white" : "text-black"
        }`}
      >
        orders
      </h2>
      <nav className=''>
        <ul className='flex justify-center items-center gap-5 border border-transparent border-b-black'>
          <NavLink to='/user/orders/purchased'>
            <li>Purchased</li>
          </NavLink>

          <NavLink to='/user/orders/sold'>
            <li>Sold</li>
          </NavLink>
        </ul>
      </nav>
      <main className='h-screen'>
        <Routes>
          <Route path='purchased' element={<Purchased user={user} />} />
          <Route path='sold' element={<Sold user={user} />} />
        </Routes>
      </main>
    </section>
  );
};

export default Orders;

const Card = () => {
  return (
    <div className='flex my-2 justify-between items-center border border-transparent border-t-black border-b-black'>
      <div className='flex justify-between items-center'>
        <img
          src='/img.png'
          alt=''
          className=' w-10 h-10 sm:w-40 sm:h-40 object-cover'
        />
        <div className='flex flex-col justify-between items-start gap-4'>
          <div>
            <h2 className='font-bold text-sm sm:text-normal'>Completed</h2>
            <p className='font-semibold text-sm sm:text-normal'>
              Order #4452426
            </p>
          </div>

          <h4 className='italic font-medium text-sm sm:text-normal'>
            01.07.2023
          </h4>
        </div>
      </div>

      <div className='flex flex-col justify-between items-center gap-3'>
        <h2 className='text-xs sm:text-normal'>Product name</h2>
        <div className=''>
          <p className='bg-red-500 w-3 h-3 sm:w-5 sm:h-5 rounded-full mb-2 text-sm sm:text-normal'></p>
          <p className='text-xs sm:text-normal'>XL</p>
        </div>
      </div>
    </div>
  );
};

const Purchased = ({ user }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    url + "/api/v1/orders/showCurrentUserOrder",
    fetcher
  );
  console.log({ data, isLoading, error });

  return (
    <div>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

const Sold = ({ user }) => {
  if (user.role === "user") {
    return (
      <div className='text-center mt-10'>
        <h2 className='text-lg sm:text-xl font-semibold'>Become a Vendor ?</h2>
        <p className='text-base'>Get Up to 90% pay back on all items sold</p>
        <Link
          to=''
          className='block mx-auto text-base my-5 bg-black text-white border-2 hover:border-black hover:bg-transparent hover:text-black rounded-3xl w-full sm:w-3/4 p-4 transition-all duration-500 ease-in-out'
        >
          Click here to get started
        </Link>
      </div>
    );
  }
  return (
    <div className='h-screen'>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};
