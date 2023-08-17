import { useState, useEffect } from "react";

// Components
import { ArrowLeft, ArrowRight } from "../../assets/icons/icon";
import { ProductCard1 } from "../../pages/products/productCard";
// Redux
import { useSelector } from "react-redux";

const Slider = ({ title, array }) => {
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(null);
  const [cardWidth, setCardWidth] = useState(null);
  const { dark } = useSelector((state) => state.ui);

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
    <main>
      <div className='slider mt-3'>
        <div className='title flex justify-between items-center'>
          <h2
            className={`text-base sm:text-xl capitalize font-bold ${
              dark ? "text-white" : ""
            }`}
          >
            {title}
          </h2>

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
          {array.map((item, index) => (
            <div
              className={`w-72 p-2 sm:w-96 overflow-hidden ${
                index === current + 1
                  ? "blur-none shadow-xl"
                  : "blur--[1px] md:blur-none"
              } transition-all duration-1000 ease-in-out`}
              key={item._id}
            >
              <ProductCard1 {...item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Slider;
