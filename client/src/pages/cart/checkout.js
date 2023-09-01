// CSS
import "./checkout.css";
import "./cart.css";
import { useEffect, useState } from "react";
// Router
import { Link, Navigate } from "react-router-dom";
// Component
import NotNav from "../../component/noNavHeader";
import { BagItem, BagTotal } from ".";
import { FlutterWave, PayStack, Stripe } from "../../assets/icons/icon";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal } from "../../features/cart/cartSlice";
// Toastify
import { toast } from "react-toastify";
// Utils
import url from "../../utils/url";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { shipping, total, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  });

  const [form, setForm] = useState({
    email: "",
    name: "",
    subscribe: false,
    apartment: "",
    address: "",
    city: "",
    country: "",
    phone: 0,
    postal: 0,
    note: "",
    payWith: "Paystack",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      let {
        email,
        name,
        subscribe,
        apartment,
        address,
        city,
        country,
        phone,
        postal,
        note,
        payWith,
      } = form;

      if (!address || !city || !country) {
        toast.error("Please fill all required fields *");
        setLoading(false);
        return;
      }

      if (!name) {
        name = user.name;
      }

      if (!email) {
        email = user.email;
      }

      const res = await fetch(url + "/api/v1/orders", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email,
          name,
          cartItems,
          shippingFee: shipping,
          subtotal: total,
          subscribe,
          apartment,
          address,
          city,
          country,
          phone,
          postal,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        toast.error("Something went wrong cannot place order");
        return;
      }

      toast.success(data.msg);
      setLoading(false);

      switch (payWith) {
        case "Paystack":
          await payWithPaystack(data.order);
          break;

        case "Flutterwave":
          await payWithFlutter(data.order);
          break;

        case "Stripe":
          payWithStripe(data.order);
          break;

        default:
          console.log("I guess you'll be paying with paystack");
          break;
      }
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  }

  const payWithPaystack = async (order) => {
    const { total, email, _id } = order;
    const res = await fetch(url + "/api/v1/payment/paystackAcceptPayment", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        amount: total,
        ref: _id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return;
    }

    setForm({ ...form, link: JSON.parse(data).data.authorization_url });
  };

  const payWithFlutter = async (order) => {
    toast.info("Payment with Flutterwave not available yet");
  };

  const payWithStripe = async (order) => {
    toast.info("Payment with Stripe not available yet");
  };

  if (!user) {
    return <Navigate to={"/auth"} />;
  }

  if (cartItems.length < 1) {
    return <Navigate to={"/product"} />;
  }

  return (
    <section id='checkout' className='container'>
      <NotNav navLinks={{ store: "stores", search: "search", cart: "cart" }} />
      <main className='flex flex-col md:flex-row justify-center sm:justify-between gap-8 w-full my-8'>
        <form className='basis-full sm:basis-1/2 text-gray-500'>
          <h2 className='text-base sm:text-lg text-black mb-4'>
            Billing details
          </h2>
          <div className='email'>
            <label htmlFor='email'>Your email</label>
            <input
              type='text'
              placeholder={user.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
            />
            <div className='update'>
              <input
                onChange={(e) =>
                  setForm({
                    ...form,
                    subscribe: e.target.checked,
                  })
                }
                value={form.subscribe}
                type='checkbox'
              />
              <span>Get updates about new products & exclusive offers</span>
            </div>
          </div>
          <div className='name'>
            <label htmlFor='name'>Your name</label>
            <input
              type='text'
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
              placeholder={user.name}
            />
          </div>

          <div>
            <label htmlFor='Apartment'>Apartment</label>
            <input
              type='text'
              placeholder='Apartment, suite, unit, etc. (Optional)'
              value={form.apartment}
              onChange={(e) => setForm({ ...form, apartment: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='Address'>
              Street Address <span className='text-red-500 font-bold'>*</span>
            </label>
            <input
              type='text'
              placeholder='Street address*'
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor='city'>
              Town / City <span className='text-red-500 font-bold'>*</span>
            </label>
            <input
              type='text'
              placeholder='Town / City*'
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div className='location'>
            <div className='country'>
              <label htmlFor='country'>
                Country <span className='text-red-500 font-bold'>*</span>
              </label>
              <input
                type='text'
                placeholder='Country*'
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='phone'>Phone number</label>
              <input
                type='number'
                placeholder='Phone number*'
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div className='phone'>
            <label htmlFor='postal-code'>Postal code</label>
            <input
              type='number'
              placeholder='Postal code (Optional)'
              value={form.postal}
              onChange={(e) => setForm({ ...form, postal: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor='Notes'>Order notes</label>
            <textarea
              placeholder='Order notes (Optional)'
              className='w-full placeholder:p-4 resize-y border border-black'
              rows='10'
            ></textarea>
          </div>
        </form>

        <div className='bag sm:basis-1/2'>
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

      <div className='my-4'>
        <h3 className='text-base sm:text-lg italic my-3'>Debit/Credit Card</h3>
        <p className='my-2 text-normal sm:text-base'>Pay with: </p>
        <div className='flex gap-2 justify-start items-center'>
          <input
            type='radio'
            name='pay_with'
            value='Paystack'
            onClick={() => setForm({ ...form, payWith: "Paystack", link: "" })}
            defaultChecked
          />
          <label>PayStack</label>
          <PayStack className='w-10 h-16' />
        </div>

        <div className='flex gap-2 justify-start items-center'>
          <input
            type='radio'
            name='pay_with'
            value='Flutterwave'
            onClick={() =>
              setForm({ ...form, payWith: "Flutterwave", link: "" })
            }
          />
          <span>Flutterwave</span>
          <FlutterWave className='w-10 h-16' />
        </div>

        <div className='flex gap-2 justify-start items-center'>
          <input
            type='radio'
            name='pay_with'
            value='Stripe'
            onClick={() => setForm({ ...form, payWith: "Stripe", link: "" })}
          />
          <span>Stripe</span>
          <Stripe className='w-10 h-16' />
        </div>
      </div>
      <div className='links'>
        {form.link ? (
          <a
            className='flex justify-center items-center w-11/12 md:w-1/2 mx-auto text-base mb-5 hover:bg-secondary border border-black p-4 rounded-xl transition-all ease-in duration-75'
            href={form.link}
            target='_blank'
            rel='noreferrer'
          >
            Pay now
          </a>
        ) : (
          <button
            className='flex justify-center items-center w-11/12 md:w-1/2 mx-auto text-base mb-5 hover:bg-secondary border border-black p-4 rounded-xl transition-all ease-in duration-75'
            onClick={handleSubmit}
          >
            {loading ? "..." : "place order"}
          </button>
        )}

        <Link
          className='block underline underline-offset-8 text-base text-center text-blue-500'
          to='/cart'
        >
          Go back to cart
        </Link>
      </div>
    </section>
  );
};

export default Checkout;
