import { Link } from "react-router-dom";
// Icons
import { FlutterWave, PayStack, Stripe } from "../../assets/icons/icon";

const CheckoutLinks = ({ form, setForm, loading, handleSubmit }) => {
  return (
    <>
      <div className='my-4'>
        <h3 className='text-base sm:text-lg italic my-3'>Debit/Credit Card</h3>
        <p className='my-2 text-normal sm:text-base'>Pay with: </p>
        <div
          className='flex gap-2 justify-start items-center cursor-pointer'
          onClick={() => {
            if (form.payWith === "Paystack") {
              return;
            }
            setForm({ ...form, payWith: "Paystack", link: "" });
          }}
        >
          <input
            type='radio'
            name='pay_with'
            value='Paystack'
            id='Paystack'
            disabled={form.link}
            defaultChecked
          />
          <label
            htmlFor='Paystack'
            className='flex gap-2 justify-start items-center'
          >
            PayStack <PayStack className='w-10 h-16' />
          </label>
        </div>

        <div
          className='flex gap-2 justify-start items-center cursor-pointer'
          onClick={() => {
            if (form.payWith === "Flutterwave") {
              return;
            }
            setForm({ ...form, payWith: "Flutterwave", link: "" });
          }}
        >
          <input
            type='radio'
            name='pay_with'
            value='Flutterwave'
            id='Flutterwave'
            disabled={form.link}
          />
          <label
            htmlFor='Flutterwave'
            className='flex gap-2 justify-start items-center'
          >
            Flutterwave <FlutterWave className='w-10 h-16' />
          </label>
        </div>

        <div
          className='flex gap-2 justify-start items-center cursor-pointer'
          onClick={() => {
            if (form.payWith === "Stripe") {
              return;
            }
            setForm({ ...form, payWith: "Stripe", link: "" });
          }}
        >
          <input
            type='radio'
            name='pay_with'
            value='Stripe'
            id='Stripe'
            disabled={form.link}
          />
          <label
            htmlFor='Stripe'
            className='flex gap-2 justify-start items-center'
          >
            Stripe <Stripe className='w-10 h-16' />
          </label>
        </div>
      </div>
      <div className='links'>
        {form.link ? (
          <a
            className='flex justify-center items-center mb-5 w-11/12 md:w-1/2 mx-auto text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-all ease-in duration-75'
            href={form.link}
            rel='noreferrer'
          >
            Payment page
          </a>
        ) : (
          <button
            className='flex justify-center items-cente mb-5 w-11/12 md:w-1/2 mx-auto text-base hover:bg-secondary border border-black p-4 rounded-xl transition-all ease-in duration-75'
            onClick={handleSubmit}
          >
            {loading ? "..." : "place order"}
          </button>
        )}

        <Link
          className='block underline underline-offset-8 text-base text-center text-blue-500 mb-10'
          to='/cart'
        >
          Go back to cart
        </Link>
      </div>
    </>
  );
};

export default CheckoutLinks;
