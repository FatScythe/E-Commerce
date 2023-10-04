// CSS
import "./checkout.css";
import "./cart.css";
import { useEffect, useState } from "react";
// Router
import { Navigate } from "react-router-dom";
// Component
import NotNav from "../../component/noNavHeader";
import { BagItem, BagTotal } from ".";
import CheckoutLinks from "./checkoutLinks";
import CheckoutForm from "./checkoutForm";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addOrder, calculateTotal } from "../../features/cart/cartSlice";
// Toastify
import { toast } from "react-toastify";
// Utils
import url from "../../utils/url";
// Hooks
import useTitle from "../../hooks/useTitle";

const Checkout = () => {
  useTitle("Checkout");
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
          payWith,
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

      toast.dismiss();

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
    const res = await fetch(url + "/api/v1/payment/paystack/acceptPayment", {
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

    dispatch(addOrder(order));

    setForm({ ...form, link: data.data.authorization_url });
  };

  const payWithFlutter = async (order) => {
    const { total, email, _id } = order;
    const res = await fetch(url + "/api/v1/payment/flutterwave/acceptPayment", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        amount: total,
        ref: _id,
        name: user.name || "",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return;
    }

    dispatch(addOrder(order));

    setForm({ ...form, link: data.data.link });
  };

  const payWithStripe = async (order) => {
    const { subTotal, shipping, _id } = order;
    const res = await fetch(
      url + "/api/v1/payment/stripe/create-payment-intent",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          total: subTotal,
          shipping,
          id: _id,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg);
      return;
    }

    setForm({
      ...form,
      link: "/stripe",
    });

    dispatch(
      addOrder({ ...order, clientSecret: data.clientSecret, link: "/stripe" })
    );
  };

  if (!user) {
    return <Navigate to={"/auth"} />;
  }

  if (cartItems.length < 1) {
    return <Navigate to={"/products"} />;
  }

  return (
    <section id='checkout' className='container'>
      <NotNav navLinks={{ store: "stores", search: "search", cart: "cart" }} />
      <main className='flex flex-col md:flex-row justify-center sm:justify-between gap-8 w-full my-8'>
        <CheckoutForm form={form} setForm={setForm} user={user} />

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

      <CheckoutLinks
        form={form}
        setForm={setForm}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default Checkout;
