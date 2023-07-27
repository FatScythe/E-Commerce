import { useState } from "react";
import "../dashboard/dashboard.css";
const Step3 = ({ product, setProduct, handleProduct }) => {
  const [colorCount, setColorCount] = useState(0);
  const [color, setColor] = useState("");

  return (
    <div id='step-3' className='sm:w-9/12 mx-auto my-5'>
      <div className='flex items-center gap-2 capitalize'>
        <span className='text-normal'>Category: </span>
        <select
          defaultValue={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className='border text-normal border-black outline-none w-1/3 p-4 capitalize'
        >
          <option>unisex</option>
          <option>men</option>
          <option>women</option>
          <option>kids</option>
        </select>
      </div>

      <div className='mt-6'>
        <label htmlFor='Colour' className='text-base'>
          Colour:
        </label>
        <input
          type='color'
          defaultValue={product.color[0]}
          onChange={(e) => setColor(e.target.value)}
          className='h-6 w-20 ml-3'
        />
        <button
          className='ml-3 bg-blue-500 py-1 px-2 text-white rounded-md'
          onClick={() => {
            if (product.color.includes(color)) return;
            setProduct({ ...product, color: [...product.color, color] });
          }}
        >
          add
        </button>
      </div>

      <div className='colors my-5'>
        {product.color.map((item, index) => {
          return (
            <button
              style={{ backgroundColor: item }}
              key={index}
              onClick={() => {
                setColorCount(index);
                setColor(item);
              }}
              className={`${
                index === colorCount ? "active" : ""
              } w-5 h-5 shadow-sm rounded-full mr-3 hover:w-6 hover:h-6`}
            ></button>
          );
        })}
        <button
          onClick={() => {
            let productColors = product.color.filter((item) => item !== color);
            setProduct({ ...product, color: productColors });
            setColor("");
          }}
          disabled={!color ? true : false}
          className='bg-red-500 block my-3 py-1 px-2 text-white rounded-md disabled:bg-gray-400'
        >
          delete color
        </button>
      </div>

      <div className='my-6'>
        <label
          htmlFor='inventory'
          className='text-sm sm:text-base block text-gray-800'
        >
          Inventory (Number of item in store)
        </label>
        <input
          type='number'
          onChange={(e) => {
            setProduct({ ...product, inventory: e.target.value });
          }}
          value={product.inventory}
          className='text-lg mt-1 w-1/2 border-b-2 border-gray-300 px-0 py-1  focus:border-gray-500 focus:outline-none'
        />
      </div>

      <div className='flex justify-start items-center gap-2'>
        <label htmlFor='shipping' className='mr-4'>
          Freeshipping
        </label>
        <input
          type='checkbox'
          onChange={(e) =>
            setProduct({
              ...product,
              freeShipping: e.target.checked,
            })
          }
          className='h-6 w-6'
        />
      </div>

      <div className='my-6 flex justify-between items-center'>
        <button
          type='button'
          className='w-fit rounded-md bg-secondary px-6 py-2 text-black focus:bg-gray-600 focus:outline-none first-letter:uppercase'
          onClick={() => setProduct({ ...product, step: product.step - 1 })}
        >
          prev
        </button>
        <button
          type='button'
          className='w-fit rounded-md bg-black hover:bg-black/60 px-6 py-2 text-white focus:bg-gray-600 focus:outline-none first-letter:uppercase'
          onClick={handleProduct}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default Step3;
