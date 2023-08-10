import { useParams } from "react-router-dom";

// Hooks
import useFetch from "../../hooks/useFetch";
// Utils
import url from "../../utils/url";
// Components
import Loader1 from "../../component/loaders/loader1";
import Error1 from "../../component/loaders/error";
import NotNav from "../../component/noNavHeader";
import { FBIcon, InstaIcon, TikTokIcon } from "../../assets/icons/icon";
import { ProductCard1 } from "../products/productCard";

const SingleStore = () => {
  const { id } = useParams();
  const { data, pending, error } = useFetch(url + "/api/v1/stores/" + id);

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
    <section id='store' className='mx-2 sm:mx-4'>
      <NotNav
        name={name}
        navLinks={{ cart: "cart", search: "search", auth: "auth" }}
      />
      <header className='flex flex-col sm:flex-row justify-start gap-5 items-center'>
        <img
          src={owner.avatar}
          className='w-44 h-44 sm:w-80 sm:h-80 object-cover rounded-lg border-4 border-accent p-1'
          alt={name}
        />
        <div className='flex flex-col gap-3 justify-center items-center sm:items-start'>
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
      </header>

      <main className='mt-5'>
        <h3 className='text-base underline underline-offset-8'>
          Products({count})
        </h3>

        <div className='mt-3 md:mt-5 grid grid-cols-12 gap-6'>
          {products.length > 0 ? (
            products.map((product) => (
              <div className='col-span-12 sm:col-span-6 md:col-span-4'>
                <ProductCard1 key={product._id} {...product} />
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
