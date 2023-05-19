import "./singleProduct.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// component
import NotNav from "../../../component/noNavHeader";
import { ArrowLeft, ArrowRight, LoveIcon } from "../../../assets/icons/icon";
import StarRated from "../../../component/star";
import { ProductCard1 } from "../index";
// hooks
import useTitle from "../../../hooks/useTitle";
import useShowNav from "../../../hooks/useShowNav";
// image
import img from "../../../assets/images/a6.jpeg";

const SingleProduct = () => {
  useShowNav(false);
  useTitle("Product Name || Ayeti_Adorn");

  const [review, setReview] = useState({
    title: "",
    comment: "",
    rating: 0,
    isOpen: false,
  });
  return (
    <section id='single-product' className='container'>
      <NotNav
        name={"Single Product"}
        navLinks={{ cart: "cart", search: "search", auth: "auth" }}
      />

      <header>
        <div className='title'>
          <img src={img} alt='product name' />
        </div>

        <div className='subtitle'>
          <div className='path'>
            <Link to='/'>home</Link>/<Link to='/products'>products</Link>/
            <span>product name</span>
          </div>
          <h3 className='name'>product name</h3>
          <h4 className='price'>$80.00</h4>
          <StarRated rating={2.2} />
          <button className='size-guide'>size guide</button>
          <div className='color'>
            <p className='text-base'>colors</p>
            <div>
              {[
                "#000",
                "#fff",
                "#5e5eee",
                "#eed85e",
                "#33e059",
                "#c333e0",
                "#e03398",
                "#f15656",
                "#ebd88300",
              ].map((item, index) => {
                return (
                  <button
                    style={{ backgroundColor: item }}
                    key={index}
                    className={`${index === 0 ? "active" : ""}`}
                  ></button>
                );
              })}
            </div>
          </div>
          <div>
            <p>size (see size guide to confirm)</p>
            <div className='size-opt'>
              <button className='active'>xl</button>
              <button>xxl</button>
              <button>xs</button>
              <button>s</button>
              <button>m</button>
              <button>l</button>
            </div>
          </div>
          <div className='btns flex flex-col gap-4'>
            <div className='add-to-cart flex flex-col sm:flex-row items-center justify-between gap-2'>
              <div className='amount font-bold sm:basis-1/5 border border-black py-2 px-2 text-base flex justify-center items-center gap-10 w-full'>
                <button>-</button> <span>0</span> <button>+</button>
              </div>
              <button className='bg-black text-white py-2 text-base sm:basis-4/5 w-full'>
                add to cart
              </button>
            </div>

            <button className='like bg-gray-300 flex gap-3 justify-center items-center py-2 text-base w-full'>
              <LoveIcon />
              add to wishlist
            </button>
          </div>
        </div>
      </header>

      <main className='mt-10'>
        <div className='description'>
          <h2 className='text-base capitalize font-semibold'>description</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            nemo nostrum, iure non ut similique qui consectetur esse dolore quia
            assumenda nihil, obcaecati, eum labore?
          </p>
        </div>
        <div className='reviews-container mt-5'>
          <h2 className='text-base capitalize font-semibold'>reviews</h2>
          <div className='reviews mt-6 h-60 overflow-y-scroll'>
            {[...Array(5)].map((item) => (
              <p
                key={Math.random() * 1000}
                className='bg-slate-200 mb-3 rounded-md p-2'
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                perspiciatis!
              </p>
            ))}
          </div>

          <div className='w-full mt-3 flex justify-center items-center'>
            <button
              className='bg-black text-white hover:bg-tomato px-3 py-2 rounded-3xl'
              onClick={() => setReview({ ...review, isOpen: !review.isOpen })}
            >
              add a review
            </button>
          </div>

          <AddReviewForm review={review} setReview={setReview} />
        </div>
      </main>

      <RelatedProducts />
    </section>
  );
};

export default SingleProduct;

const Rating = ({ review, setReview }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className='rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            key={index}
            onMouseEnter={() => setHover(index)}
            onMouseDown={() => setHover(review.rating)}
            onClick={() => setReview({ ...review, rating: index })}
          >
            <span
              className={`${
                index <= (review.rating || hover) ? "text-tomato" : "text-white"
              } text-lg mr-2`}
            >
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
};

const AddReviewForm = ({ review, setReview }) => {
  return (
    <div
      className={`add-review w-full sm:w-2/4 mx-auto ${
        review.isOpen ? "max-h-[32rem]" : "max-h-0"
      } overflow-hidden transition-all duration-1000`}
    >
      <div className='rating mt-3 bg-gray-300 py-3 flex justify-center items-center gap-4 capitalize'>
        <p>your rating*</p>
        <Rating review={review} setReview={setReview} />
      </div>

      <form className='capitalize'>
        <div className='mt-3 flex flex-col justify-between items-start'>
          <label htmlFor='title' className='font-semibold text-base'>
            title
          </label>
          <input
            type='text'
            value={review.title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            placeholder='Add review title *'
            className='w-full outline-none border border-black p-2 placeholder:pl-2'
          />
        </div>

        <div className='mt-3 flex flex-col justify-between items-start'>
          <label htmlFor='comment' className='font-semibold text-base'>
            comment
          </label>
          <textarea
            name='comment'
            id='comment'
            cols='30'
            rows='10'
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            placeholder='Add review *'
            className='w-full outline-none border border-black p-2 placeholder:pl-2 resize-none'
          ></textarea>
        </div>

        <div className='mt-3 flex justify-end items-center'>
          <button
            type='submit'
            className='w-fit bg-black text-white px-3 py-2 hover:opacity-70 hover:scale-95'
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

const RelatedProducts = () => {
  const sliderContainer = useRef(null);
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(0);

  // useEffect(() => {
  //   if (!sliderContainer.current) return;
  //   getWidth();

  //   console.log(`Here is the width ${width}`, sliderContainer);
  // }, [width]);

  // const getWidth = () => {
  //   const newWidth = sliderContainer.current.childNodes[0].offsetWidth;
  //   setWidth(newWidth);
  // };

  useEffect(() => {
    window.addEventListener(
      "resize",
      setWidth(sliderContainer.current.childNodes[0].offsetWidth)
    );

    return () => {
      window.removeEventListener(
        "resize",
        setWidth(sliderContainer.current.childNodes[0].offsetWidth)
      );

      console.log(width);
    };
  }, [current, width]);

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
      <div className='related-products'>
        <div className='title flex justify-between items-center'>
          <h2 className='text-base capitalize font-semibold'>
            related product
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
          ref={sliderContainer}
          style={{
            transform: `translateX(-${current * 24}rem)`,
            width: `${10 * 30}rem`,
          }}
          className='carousel-container p-4 mt-5 overflow-hidden flex gap-8 items-center transition-all duration-700 ease-in-out'
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <div
              className={`w-72 p-2 sm:w-96 overflow-hidden ${
                index === current + 1
                  ? "blur-none scale-105 shadow-xl bg-white"
                  : "scale-90 blur-sm md:blur-none"
              } transition-all duration-1000 ease-in`}
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
