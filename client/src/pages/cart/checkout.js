import { Link, Navigate } from "react-router-dom";
// Component
import NotNav from "../../component/noNavHeader";
import { BagItem, BagTotal } from ".";
// Redux
import { useDispatch, useSelector } from "react-redux";
// CSS
import "./checkout.css";
import "./cart.css";
import { useEffect } from "react";
import { calculateTotal } from "../../features/cart/cartSlice";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  });

  if (!user) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <section id='checkout' className='container'>
      <NotNav navLinks={{ store: "stores", search: "search", cart: "cart" }} />
      <main className='flex flex-col sm:flex-row justify-center sm:justify-between gap-8 w-full my-8'>
        <form className='basis-full sm:basis-1/2 text-gray-500'>
          <div className='email'>
            <label htmlFor='email'>Your email</label>
            <input type='text' placeholder='holadhayo28@gmail.com' />
            <div className='update'>
              <input type='checkbox' />
              <span>Get updates about new products & exclusive offers</span>
            </div>
          </div>
          <div className='name'>
            <label htmlFor='name'>Your name</label>
            <input type='text' placeholder='Full Name' />
          </div>

          <div className='wallet'>
            <label htmlFor='wallet'>Choose a wallet</label>
            <select>
              <option value='popularity'>Popularity</option>
              <option value='average rating'>Average rating</option>
              <option value='newness'>Newness</option>
              <option value='price'>Price: low to high</option>
              <option value='price'>Price: high to low</option>
            </select>
          </div>
          <div className='city'>
            <label htmlFor='city'>City</label>
            <select>
              <option value='popularity'>Popularity</option>
              <option value='average rating'>Average rating</option>
              <option value='newness'>Newness</option>
              <option value='price'>Price: low to high</option>
              <option value='price'>Price: high to low</option>
            </select>
          </div>
          <div className='location'>
            <div className='country'>
              <label htmlFor='country'>Country</label>
              <select>
                <option value='popularity'>Popularity</option>
                <option value='average rating'>Average rating</option>
                <option value='newness'>Newness</option>
                <option value='price'>Price: low to high</option>
                <option value='price'>Price: high to low</option>
              </select>
            </div>
            <div className='postal'>
              <label htmlFor='postal-code'>Postal code</label>
              <input type='text' placeholder='001001' />
            </div>
          </div>

          <div className='phone'>
            <label htmlFor='phone-number'>Phone number</label>
            <input type='text' placeholder='Phone Number' />
          </div>
          <div className='links'>
            <Link to='/checkout'>
              <button className='w-full md:w-11/12 text-base mb-5 hover:bg-secondary border border-black p-4 rounded-xl transition-all ease-in duration-75;'>
                {user ? "proceed to payment" : "sign in"}
              </button>
            </Link>

            <Link
              className='block underline underline-offset-8 text-base text-center text-blue-500'
              to='/cart'
            >
              Go back to cart
            </Link>
          </div>
        </form>

        <div className='bag hidden sm:block sm:basis-1/2'>
          <div className='bag-items'>
            {cartItems.map((item) => {
              return <BagItem key={item.id} {...item} />;
            })}
          </div>

          <div className='bag-total'>
            <BagTotal />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Checkout;
