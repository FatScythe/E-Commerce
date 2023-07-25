import { toast } from "react-toastify";

const Step1 = ({ product, setProduct }) => {
  const handleNext = () => {
    const { name, price, desc } = product;

    if (!name || !price || !desc) {
      toast.error("Please fill all field");
      return;
    }

    setProduct({ ...product, step: 1 });
  };
  return (
    <div id='step-1'>
      <form className='sm:w-9/12 mx-auto'>
        <div className='relative my-3'>
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

        <div className=''>
          <label htmlFor='product-price' className='text-sm text-gray-800'>
            Product Price
          </label>
          <input
            type='number'
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
            value={product.price}
            className='text-lg mt-1 w-full border-b-2 border-gray-300 px-0 py-1  focus:border-gray-500 focus:outline-none'
          />
        </div>

        <div className='relative mt-6'>
          <label
            htmlFor='description'
            className='block mb-3 italic sm:text-base'
          >
            Description
          </label>
          <textarea
            className='border border-black w-full resize-y p-3 sm:text-base'
            cols={90}
            rows={2}
            onChange={(e) => {
              setProduct({ ...product, desc: e.target.value });
            }}
            value={product.desc}
          ></textarea>
        </div>

        <div className='my-6 flex justify-end items-center'>
          <button
            type='button'
            className='w-fit rounded-md bg-secondary px-6 py-2 text-black focus:bg-gray-600 focus:outline-none first-letter:uppercase'
            onClick={handleNext}
          >
            next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
