export const Step1 = ({ product, setProduct }) => {
  return (
    <div>
      <form className='sm:w-9/12 mx-auto'>
        <div className='relative mt-6'>
          <input
            type='text'
            placeholder='Product Name'
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value });
            }}
            value={product.name}
            className='peer mt-1 text-lg w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-lg placeholder:text-transparent focus:border-gray-500 focus:outline-none'
          />
          <label
            htmlFor='product-name'
            className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 pointer-events-none absolute'
          >
            Product Name
          </label>
        </div>

        <br />
        <br />
        <br />

        <div className='relative'>
          <input
            type='number'
            placeholder='Product Price'
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
            value={product.price}
            className='peer text-lg mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-lg placeholder:text-transparent focus:border-gray-500 focus:outline-none'
          />
          <label
            htmlFor='product-price'
            className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 pointer-events-none absolute'
          >
            Product Price
          </label>
        </div>

        <br />
        <br />
        <br />

        <div className='relative mt-6'>
          <label
            htmlFor='description'
            className='block mb-3 italic sm:text-base'
          >
            Description
          </label>
          <textarea
            className='border border-black w-full resize-none'
            cols={90}
            rows={10}
          ></textarea>
        </div>

        <div className='my-6 flex justify-end items-center'>
          <button
            type='button'
            className='absolute bottom-2 w-fit rounded-md bg-secondary px-6 py-2 text-black focus:bg-gray-600 focus:outline-none first-letter:uppercase'
          >
            next
          </button>
        </div>
      </form>
    </div>
  );
};

export const Step2 = ({ product, setProduct }) => {
  return <div className='text-xl'>Step 2</div>;
};

export const Step3 = ({ product, setProduct }) => {
  return <div className='text-xl'>Step 3</div>;
};

export const Step4 = ({ product, setProduct }) => {
  return <div className='text-xl'>Step 4</div>;
};
