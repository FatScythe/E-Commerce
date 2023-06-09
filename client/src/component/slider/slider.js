import { useState, useEffect } from "react";

// Components
import { ArrowLeft, ArrowRight } from "../../assets/icons/icon";
import { ProductCard1 } from "../../pages/products/productCard";

const Slider = ({ title, array }) => {
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(null);
  const [cardWidth, setCardWidth] = useState(null);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    setWidth(window.innerWidth);

    if (width > 640) {
      setCardWidth(24);
    } else {
      setCardWidth(18);
    }

    return () => window.removeEventListener("resize", updateWidth);
  }, [width]);

  useEffect(() => {
    const number = (current) => {
      // last is the array.length - 1
      const last = 10 - 1;

      if (current >= last) {
        return last;
      }

      if (current <= 0) {
        return 0;
      }

      return current;
    };
    setCurrent(number);
  }, [current]);

  return (
    <footer>
      <div className='slider mt-3'>
        <div className='title flex justify-between items-center'>
          <h2 className='text-base sm:text-xl capitalize font-bold'>{title}</h2>

          <div className='controls flex justify-between items-center gap-6'>
            <button
              onClick={() => setCurrent(current - 1)}
              className='bg-accent disabled:bg-primary disabled:scale-95 hover:bg-primary text-black hover:text-white disabled:hover:text-black p-3 disabled:p-1 rounded-full disabled:ring-transparent hover:ring-4 ring-accent ring-offset-8'
              disabled={current === 0}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => setCurrent(current + 1)}
              className='bg-accent disabled:bg-primary hover:bg-primary text-black hover:text-white disabled:hover:text-black p-3 disabled:p-1 rounded-full disabled:ring-transparent hover:ring-4 ring-accent ring-offset-8'
              disabled={current === 9}
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div
          style={{
            transform: `translateX(-${current * cardWidth}rem)`,
            width: `${10 * cardWidth}rem`,
          }}
          className='carousel-container p-4 mt-5 overflow-hidden flex gap-8 items-center transition-all duration-700 ease-in-out'
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <div
              className={`w-72 p-2 sm:w-96 overflow-hidden ${
                index === current + 1
                  ? "blur-none scale-90 shadow-xl bg-white"
                  : "scale-75 blur--[1px] md:blur-none"
              } transition-all duration-1000 ease-in-out`}
              key={Math.random() * 1000}
            >
              <ProductCard1 index={index} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Slider;
