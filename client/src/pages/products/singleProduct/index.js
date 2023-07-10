import "./singleProduct.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
// component
import NotNav from "../../../component/noNavHeader";
import { LoveIcon } from "../../../assets/icons/icon";
import StarRated from "../../../component/star";
// hooks
import useTitle from "../../../hooks/useTitle";
import useFetch from "../../../hooks/useFetch";
// image
import Slider from "../../../component/slider/slider";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
// Toastify
import { toast } from "react-toastify";

import url from "../../../utils/url";

const SingleProduct = () => {
  const { id } = useParams();

  const { data, pending, error } = useFetch(url + "/api/v1/products/" + id);

  useTitle(data ? data.product.name : "Ayeti_Adorn || Product " + id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((store) => store.cart);

  const [options, setOptions] = useState({
    id: "",
    name: "",
    image: "",
    price: 0,
    color: "",
    size: "",
    amount: 1,
  });

  const [sizeCount, setSizeCount] = useState(-1);
  const [colorCount, setColorCount] = useState(-1);

  const handleAmountToggle = (operation) => {
    if (operation === "-" && !options.amount < 1) {
      setOptions({ ...options, amount: options.amount - 1 });
      return;
    }

    setOptions({ ...options, amount: options.amount + 1 });
  };

  const [review, setReview] = useState({
    title: "",
    comment: "",
    rating: 0,
    isOpen: false,
    isModalOpen: false,
  });
  if (pending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong : (</div>;
  }

  const { product } = data;

  let cartPayload = {
    ...options,
    name: product.name,
    image: product.image,
    id: product._id,
    price: product.price,
    shipping: product.freeShipping ? 2 : 0,
  };
  return (
    <section id='single-product' className='container'>
      {review.isModalOpen && <SizeGuide />}
      <NotNav
        name={product.name}
        navLinks={{ cart: "cart", search: "search", auth: "auth" }}
      />

      <header>
        <div className='title'>
          <img src={product.image} alt={product.name} />
        </div>

        <div className='subtitle'>
          <div className='path'>
            <Link to='/'>home</Link>/<Link to='/products'>products</Link>/
            <span>{product.name}</span>
          </div>
          <h3 className='name'>{product.name}</h3>
          <h4 className='price'>${product.price}</h4>
          <StarRated rating={product.averageRating} />
          <button
            className='size-guide'
            onClick={() =>
              setReview({ ...review, isModalOpen: !review.isModalOpen })
            }
          >
            size guide
          </button>
          <div className='color'>
            <p className='text-base'>colors</p>
            <div>
              {product.color.map((item, index) => {
                return (
                  <button
                    style={{ backgroundColor: item }}
                    key={index}
                    onClick={() => {
                      setColorCount(index);
                      setOptions({ ...options, color: item });
                    }}
                    className={`${index === colorCount ? "active" : ""}`}
                  ></button>
                );
              })}
            </div>
          </div>
          <div>
            <p>size (see size guide to confirm)</p>
            <div className='size-opt'>
              {["xl", "xxl", "xs", "s", "m", "l"].map((size, index) => {
                return (
                  <button
                    key={index + 1}
                    onClick={() => {
                      setOptions({ ...options, size });
                      setSizeCount(index);
                    }}
                    className={`${sizeCount === index && "active"}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          <div className='btns flex flex-col gap-4'>
            <div className='add-to-cart flex flex-col sm:flex-row items-center justify-between gap-2'>
              <div className='amount font-bold sm:basis-1/5 border border-black py-2 px-2 text-base flex justify-center items-center gap-10 w-full'>
                <button
                  onClick={() => handleAmountToggle("-")}
                  disabled={options.amount <= 1}
                  className='disabled:text-gray-500'
                >
                  -
                </button>
                <span>{options.amount}</span>
                <button onClick={() => handleAmountToggle("+")}>+</button>
              </div>
              <button
                onClick={() => {
                  const { cartItems } = cart;
                  if (cartItems.some((e) => e.name === cartPayload.name)) {
                    navigate("/cart");
                    return;
                  }
                  if (!options.size && !options.color) {
                    toast.error("Please provide size and color");
                    return;
                  }
                  dispatch(addToCart(cartPayload));
                  setColorCount(-1);
                  setSizeCount(-1);
                  toast.success("Added " + cartPayload.name + " to bag");
                }}
                className='bg-black text-white py-2 text-base sm:basis-4/5 w-full'
              >
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
          <p>{product.desc}</p>
        </div>
        <div className='reviews-container mt-5'>
          <h2 className='text-base capitalize font-semibold'>reviews</h2>
          {product.reviews.length > 0 && (
            <div className='reviews mt-6 h-60 overflow-y-scroll'>
              {product.reviews.map((item) => (
                <p
                  key={Math.random() * 1000}
                  className='bg-slate-200 mb-3 rounded-md p-2'
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                  perspiciatis!
                </p>
              ))}
            </div>
          )}

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

      <Slider title='related products' />
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

const SizeGuide = () => {
  return (
    <section className='sguide w-full h-screen bg-black/20 z-30 flex justify-center items-center'>
      <div className=''>
        <h1>Size Guide</h1>
      </div>
    </section>
  );
};
