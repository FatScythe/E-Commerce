// Hooks
import useTitle from "../../hooks/useTitle";
// Component
import { ArrowUpRight, WaveHandIcon } from "../../assets/icons/icon";
import { useState } from "react";

const Contact = () => {
  useTitle("Contact Us");

  const [value, setValue] = useState({
    name: "",
    email: "",
    message: "",
    loading: false,
  });

  return (
    <section id='contact' className='container my-6'>
      <h2 className='text-lg sm:text-2xl font-semibold'>
        <span className='first-letter:uppercase block'>
          love to hear from you,
        </span>
        <span className='flex justify-start items-center'>
          <span className='first-letter:uppercase'>get in touch</span>
          <span>
            <WaveHandIcon className='w-10 h-10 sm:w-14 sm:h-14 ml-2' />
          </span>
        </span>
      </h2>

      <form className='mt-5' onSubmit={(e) => e.preventDefault()}>
        <main className=' grid grid-cols-12 gap-3'>
          <div className='col-span-12 sm:col-span-6'>
            <label className='block font-bold pb-2'>Your Name</label>
            <input
              type='text'
              placeholder='Enter your name'
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              className='bg-gray-300/30 w-full outline-none p-2 text-base border border-transparent focus:border-black focus:border-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
            />
          </div>

          <div className='col-span-12 sm:col-span-6'>
            <label className='block font-bold pb-2'>Your Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              className='bg-gray-300/30 w-full outline-none p-2 text-base border border-transparent focus:border-black focus:border-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
            />
          </div>

          <div className='col-span-12 row-start-3 row-end-5'>
            <label className='block font-bold pb-2'>Message</label>
            <textarea
              placeholder='Message...'
              rows='10'
              value={value.message}
              onChange={(e) => setValue({ ...value, message: e.target.value })}
              className='bg-gray-300/30 w-full outline-none p-2 text-base border border-transparent focus:border-black focus:border-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2 resize-none'
            ></textarea>
          </div>
        </main>
        <button
          type='submit'
          disabled={value.loading}
          className='w-full flex justify-center items-center gap-2 sm:w-1/2 disabled:bg-gray-500 bg-black hover:bg-black/80 px-6 py-4 my-2 text-white focus:bg-gray-600 focus:outline-none first-letter:uppercase'
        >
          <span> send message</span>
          <ArrowUpRight />
        </button>
      </form>
    </section>
  );
};
export default Contact;
