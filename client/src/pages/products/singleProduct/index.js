import "./singleProduct.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// component
import NotNav from "../../../component/noNavHeader";
import { LoveIcon } from "../../../assets/icons/icon";
import StarRated from "../../../component/star";
import Reviews from "./reviews";
import Slider from "../../../component/slider/slider";

// hooks
import useTitle from "../../../hooks/useTitle";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
// Toastify
import { toast } from "react-toastify";
import { fetchSingleProduct } from "../../../features/product/productSlice";

import url from "../../../utils/url";

const SingleProduct = () => {
  let { id } = useParams();
  const cart = useSelector((store) => store.cart);
  const { user } = useSelector((store) => store.user);
  const { singleProduct, singleProduct_loading, products } = useSelector(
    (store) => store.product
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleProduct({ id, user }));
  }, [dispatch, id, user]);

  useTitle(
    singleProduct ? singleProduct.product.name : "Ayeti_Adorn || Product " + id
  );

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

  const handleWishList = async () => {
    if (!user) {
      toast.error("Please Login");
      navigate("/auth");
      return;
    }

    try {
      const response = await fetch(url + "/api/v1/products/like/" + id, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg);
        return;
      }
      dispatch(fetchSingleProduct({ id, user }));
      toast.success(data.msg);
    } catch (error) {
      console.error(error);
    }
  };

  const [sizeGuide, setSizeGuide] = useState(false);

  if (singleProduct_loading) {
    return <div>Loading...</div>;
  }

  if (!singleProduct_loading & !singleProduct) {
    return <div>Something went wrong : (</div>;
  }

  const { product } = singleProduct;

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
      {sizeGuide && <SizeGuide />}
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
          <button className='size-guide' onClick={() => setSizeGuide(true)}>
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

            <button
              className='like bg-gray-300 flex gap-3 justify-center items-center py-2 text-base w-full'
              onClick={() => handleWishList()}
            >
              {user ? (
                <>
                  {singleProduct.liked ? (
                    <>
                      <LoveIcon color={true} /> remove from wishlist
                    </>
                  ) : (
                    <>
                      <LoveIcon /> add to wishlist
                    </>
                  )}
                </>
              ) : (
                <>
                  <LoveIcon />
                  add to wishlist
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className='mt-10'>
        <div className='description'>
          <h2 className='text-base capitalize font-semibold'>description</h2>
          <p>{product.desc}</p>
        </div>
        <Reviews />
      </main>

      <Slider
        title='related products'
        array={products.filter((product) => product.id !== id)}
      />
    </section>
  );
};

export default SingleProduct;

const SizeGuide = () => {
  return (
    <section className='sguide w-full h-screen bg-black/20 z-30 flex justify-center items-center'>
      <div className=''>
        <h1>Size Guide</h1>
      </div>
    </section>
  );
};
