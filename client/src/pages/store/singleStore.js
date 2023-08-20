import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from "react";

// Hooks
import useFetch from "../../hooks/useFetch";
// Utils
import url from "../../utils/url";
// Components
import Loader1 from "../../component/loaders/loader1";
import Error1 from "../../component/loaders/error";
import NotNav from "../../component/noNavHeader";
import {
  ChevronLeft,
  FBIcon,
  InstaIcon,
  TikTokIcon,
} from "../../assets/icons/icon";
import { ProductCard1 } from "../products/productCard";

const SingleStore = () => {
  const { id } = useParams();
  const { data, pending, error } = useFetch(url + "/api/v1/stores/" + id);

  const [nav, setNav] = useState(false);
  const [size, setSize] = useState(200);
  const changeNav = () => {
    window.scrollY <= 150 ? setNav(true) : setNav(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    if (nav) {
      setSize(150);
    } else {
      setSize(50);
    }
    return () => window.removeEventListener("scroll", changeNav);
  }, [nav]);

  if (pending) {
    return (
      <>
        <NotNav
          name={"Vendor"}
          navLinks={{ cart: "cart", search: "search", auth: "auth" }}
        />
        <Loader1 />
      </>
    );
  }

  if (error || data === undefined) {
    return (
      <>
        <NotNav
          name={id}
          navLinks={{ cart: "cart", search: "search", auth: "auth" }}
        />
        <Error1 />
      </>
    );
  }
  const { name, owner, desc, insta, tiktok, fb } = data.store;
  const { count, products } = data.storeProducts;
  return (
    <section id='store' className='mx-2 sm:mx-4 mt-8 relative'>
      <header
        className={`flex sm:flex-row justify-start ${
          !nav ? "bg-white/80 p-2" : "flex-col"
        } gap-5 items-center sticky z-30 top-0 transition-all duration-500`}
      >
        {
          <Link to='/stores'>
            <ChevronLeft />
          </Link>
        }
        <div
          className={`${
            !nav ? "rounded-[50%]" : "rounded-lg"
          } flex justify-center items-center overflow-hidden`}
        >
          <img
            src={owner.avatar}
            className={`object-cover object-center ${
              !nav ? "" : "p-1 border-4"
            } border-accent transition-all duration-700`}
            width={size}
            height={size}
            alt={name}
          />
        </div>

        {nav ? (
          <div className='flex flex-col gap-3 justify-center items-center sm:items-start'>
            <p className='sm:text-lg font-semibold'>{name}</p>
            <p className='sm:text-lg italic font-semibold'>"{desc}"</p>
            <div className='flex justify-start items-center gap-5'>
              <a href={insta} target='_blank' rel='noreferrer'>
                <InstaIcon className={"w-6 h-6 sm:w-8 sm:h-8"} />
              </a>

              <a href={fb} target='_blank' rel='noreferrer'>
                <FBIcon className={"w-6 h-6 sm:w-8 sm:h-8"} />
              </a>

              <a href={tiktok} target='_blank' rel='noreferrer'>
                <TikTokIcon className={"w-6 h-6 sm:w-8 sm:h-8"} />
              </a>
            </div>
          </div>
        ) : (
          <h2 className='text-base sm:text-lg'>{name}</h2>
        )}
      </header>

      <main className='mt-5'>
        <h3 className='text-base underline underline-offset-8'>
          Products({count})
        </h3>

        <div className='mt-3 md:mt-5 grid grid-cols-12 gap-6'>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                className='col-span-12 sm:col-span-6 md:col-span-4'
                key={product._id}
              >
                <ProductCard1 {...product} />
              </div>
            ))
          ) : (
            <div className='text-lg first-letter:uppercase italic col-span-12 text-center'>
              No products in store yet
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default SingleStore;
