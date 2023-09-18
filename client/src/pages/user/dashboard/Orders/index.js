import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "../../user.css";
import { useEffect } from "react";
// Redux
import { useSelector } from "react-redux";
// Components
import Purchased from "./Purchased";
import Sold from "./Sold";

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
          <Route path='purchased' element={<Purchased />} />
          <Route path='sold' element={<Sold user={user} />} />
        </Routes>
      </main>
    </section>
  );
};

export default Orders;
