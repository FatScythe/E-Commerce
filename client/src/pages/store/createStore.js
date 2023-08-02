import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "../../assets/icons/icon";
const CreateStore = () => {
  return (
    <section id='create-store' className='container mt-8'>
      <h2 className='text-lg sm:text-xl font-semibold sm:font-bold'>
        Create Store
      </h2>
      <p className='text-base'>
        At Ayeti Adorn we value all our vendors, providing them with the best
        exposure for their business. With only atleast a cost of 5% the on each
        product
      </p>

      <StoreForm />
    </section>
  );
};

export default CreateStore;

const StoreForm = () => {
  const [value, setValue] = useState({
    name: "",
    desc: "",
    insta: "",
    fb: "",
    tiktok: "",
    type: "add",
    loading: false,
    show: true,
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} className='mt-5'>
      <main className='grid grid-cols-12 gap-3'>
        <div className='col-span-12 sm:col-span-6'>
          <label className='block font-bold pb-2'>Store Name</label>
          <input
            type='text'
            value={value.name}
            placeholder='Enter your Store name'
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
          />
        </div>

        <div className='col-span-12 sm:col-span-6'>
          <label className='block font-bold pb-2'>Instagram Link</label>
          <input
            type='text'
            value={value.insta}
            placeholder='Enter your store Instagram link'
            onChange={(e) => setValue({ ...value, insta: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
          />
        </div>

        <div className='col-span-12 sm:col-span-6'>
          <label className='block font-bold pb-2'>Facebook Link</label>
          <input
            type='text'
            value={value.fb}
            placeholder='Enter your store Facebook link'
            onChange={(e) => setValue({ ...value, fb: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
          />
        </div>

        <div className='col-span-12 sm:col-span-6'>
          <label className='block font-bold pb-2'>TikTok Link</label>
          <input
            type='text'
            value={value.tiktok}
            placeholder='Enter your store Tiktok link'
            onChange={(e) => setValue({ ...value, tiktok: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
          />
        </div>

        <div className='col-span-12 row-start-3 row-end-5'>
          <label className='block font-bold pb-2'>Description</label>
          <textarea
            placeholder='Describe your store and products'
            rows='10'
            value={value.desc}
            onChange={(e) => setValue({ ...value, desc: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2 resize-none'
          ></textarea>
        </div>
      </main>
      <div className='my-4 flex gap-3 mb-10 flex-col justify-center items-center'>
        <button
          type='submit'
          className='w-full sm:w-1/2 bg-black hover:bg-black/80 px-6 py-2 text-white focus:bg-gray-600 focus:outline-none first-letter:uppercase'
        >
          create store
        </button>
        {value.show && (
          <Link
            to='user/products'
            className='w-fit hover:text-blue-500 hover:border-b-blue-400 text-base flex justify-center items-center border border-transparent border-b-black pb-3'
          >
            My Products <ArrowUpRight />
          </Link>
        )}
      </div>
    </form>
  );
};
