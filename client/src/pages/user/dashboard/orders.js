import { NavLink, Routes, Route, useNavigate, Link } from "react-router-dom";
import "../user.css";
import { useEffect, useState } from "react";
// Hook
import useSWR from "swr";
// Redux
import { useSelector } from "react-redux";
// Utils
import url from "../../../utils/url";
import Loader1 from "../../../component/loaders/loader1";
import Error1 from "../../../component/loaders/error";

const Orders = ({ user }) => {
  const navigate = useNavigate();
  const { dark } = useSelector((store) => store.ui);

  useEffect(() => {
    navigate("/user/orders/purchased");
  }, [navigate]);

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
          <Route path='purchased' element={<Purchased />} />
          <Route path='sold' element={<Sold user={user} />} />
        </Routes>
      </main>
    </section>
  );
};

export default Orders;

const Purchased = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    url + "/api/v1/orders/showCurrentUserOrder",
    fetcher
  );

  if (isLoading) {
    return (
      <div>
        <Loader1 />
      </div>
    );
  }

  if (error || (data && data?.msg)) {
    const message = error ? error.message : data.msg;
    return (
      <div>
        <Error1 msg={message} />
      </div>
    );
  }

  const { orders } = data;

  if (!orders.length > 0) {
    return;
  }

  return (
    <>
      {orders.map((order) => {
        return <OrderAccordian key={order._id} order={order} />;
      })}
    </>
  );
};
const Card = ({ item, order }) => {
  const { name, price, image } = item;

  return (
    <div className='flex my-2 justify-between items-center border border-transparent border-t-black border-b-black'>
      <div className='flex justify-between items-center'>
        <img
          src={image}
          alt={name}
          className=' w-10 h-10 sm:w-32 sm:h-32 m-2 rounded-md object-cover'
        />
        <div className='flex flex-col justify-between items-start gap-4 capitalize'>
          <div>
            <h2 className='font-bold text-sm sm:text-normal text-gray-500'>
              {order.status}
            </h2>
            <p className='font-semibold text-sm sm:text-normal bg-emerald-600 px-2 py-1 rounded-xl'>
              {order.payWith}
            </p>
          </div>

          <h4 className='italic font-medium text-sm sm:text-normal'>
            01.07.2023 {order.createdAt}
          </h4>
        </div>
      </div>
      <div className='flex flex-col justify-between items-center gap-5'>
        <h2 className='text-xs sm:text-normal capitalize font-semibold'>
          {name}
        </h2>
        <div className=''>
          {/* <p className='bg-red-500 w-3 h-3 sm:w-5 sm:h-5 rounded-full mb-2 text-sm sm:text-normal'></p> */}
          <p className='text-xs sm:text-normal font-bold'>${price}</p>
        </div>
      </div>
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

const OrderAccordian = ({ order }) => {
  const [isAccOpen, setIsAccOpen] = useState(false);
  return (
    <div
      className='py-2 mx-auto w-full border-gray-400 border-t'
      onClick={() => setIsAccOpen(!isAccOpen)}
    >
      <header className='flex justify-between items-center md:cursor-pointer'>
        <h3 className='font-semibold text-sm sm:text-normal'>
          Order #{order._id}
        </h3>
        <button className='font-bold text-base'>{isAccOpen ? "-" : "+"}</button>
      </header>

      <article
        className={`overflow-hidden first-letter:uppercase lowercase transition-all duration-700 ${
          isAccOpen ? "max-h-full" : "max-h-0"
        }`}
      >
        {order.orderItems.map((item) => {
          return <Card key={item._id} item={item} order={order} />;
        })}
      </article>
    </div>
  );
};
