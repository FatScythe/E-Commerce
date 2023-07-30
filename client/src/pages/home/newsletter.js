import { Link } from "react-router-dom";
const Newsletter = () => {
  return (
    <section className='my-3 mx-1 sm:mx-5 text-center'>
      <main className='container border border-black/80 py-10 px-5'>
        <h2 className='bellefair font-bold text-lg sm:text-xl leading-10 mb-8'>
          NEWSLETTER
        </h2>
        <p className='mb-8 w-4/5 mx-auto leading-9 text-base sm:text-lg'>
          Join our email list and be the first to know about new limited edition
          products, material innovations, and lots of other fun updates.
        </p>
        <form
          className='flex gap-8 justify-start flex-col items-start sm:flex-row sm:justify-center sm:items-center'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type='email'
            placeholder='ENTER YOUR EMAIL'
            className='py-4 px-6 w-full sm:w-2/5 border border-transparent border-b border-b-black focus:border-black'
          />
          <button className='bg-black border-2 border-black text-white px-4 py-5 hover:bg-white hover:text-black hover:scale-105 transition-all duration-500'>
            SUBSCRIBE
          </button>
        </form>

        <p className='mt-6 leading-9 sm:text-base text-slate-600'>
          Note: You can opt-out at any time. See our
          <Link
            to='/contact'
            className='mx-1 underline whitespace-nowrap underline-offset-2 text-black'
          >
            Privacy Policy
          </Link>
          and
          <Link
            to='/about'
            className='mx-1 underline underline-offset-2 text-black'
          >
            Terms
          </Link>
          .
        </p>
      </main>
    </section>
  );
};

export default Newsletter;
