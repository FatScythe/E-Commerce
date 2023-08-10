import "./store.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Images
import bg from "../../assets/images/b4.jpeg";
import img from "../../assets/images/b7.jpeg";
// Hook
import useTitle from "../../hooks/useTitle";
// Icon
import { Clock } from "../../assets/icons/icon";
// Redux
import { fetchStores } from "../../features/store/storeSlice";
import { useDispatch, useSelector } from "react-redux";
// Components
import Loader1 from "../../component/loaders/loader1";
import Error1 from "../../component/loaders/error";

const StorePage = () => {
  const { stores, stores_status } = useSelector((store) => store.store);
  const dispatch = useDispatch();
  useTitle("Stores");

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  if (stores_status === "pending") {
    return <Loader1 />;
  }

  if (stores_status === "err" || stores === undefined) {
    return <Error1 />;
  }

  return (
    <section id='stores' className='container mt-6 overflow-hidden'>
      <h3 className='text-base my-5 italic font-semibold'>
        {stores.count} Stores
      </h3>
      <div className='w-full grid grid-cols-12 gap-4'>
        {stores.stores.map((store) => {
          return <StoreCard {...store} key={store._id} />;
        })}
      </div>
    </section>
  );
};

export default StorePage;

const StoreCard = ({ _id, name, owner, open }) => {
  const { products } = useSelector((store) => store.product);

  const [images, setImages] = useState([bg, img]);
  const [bgImage, setBgImage] = useState(bg);

  const checkForProductImages = (products) => {
    let filteredProduct;
    if (products === undefined || null) {
      filteredProduct = [];
    }
    filteredProduct = products.filter((product) => product.store === name);
    if (filteredProduct.length > 1) {
      setImages([filteredProduct[0].image, filteredProduct[1].image]);
      setBgImage(filteredProduct[0].image);
    }
  };

  useEffect(() => {
    checkForProductImages(products);
  }, []);

  return (
    <Link
      to={"/store/" + _id}
      className='relative col-span-12 sm:col-span-6 md:col-span-4 group h-60 sm:h-80 w-full overflow-hidden rounded-md cursor-pointer'
      title={name}
      onMouseOver={() => setBgImage(images[1])}
      onMouseOut={() => setBgImage(images[0])}
    >
      {!open && (
        <div className='absolute top-0 bottom-0 right-0 left-0 bg-black/25'>
          <div className='flex justify-between items-center gap-1 absolute top-2 right-2 z-20 bg-yellowish p-2 rounded-2xl capitalize'>
            <Clock className='w-6 h-6 sm:h-4 sm:w-4 text-white' />
            <span className='sm:text-sm'>closed</span>
          </div>
        </div>
      )}

      <img
        src={bgImage}
        draggable={false}
        className='transform scale-100 group-hover:scale-125 transition-all duration-700 object-bottom sm:bg-cover'
        alt='Store products'
      />

      <header className='w-fit sm:w-full flex flex-col justify-center items-center overflow-hidden absolute left-1 bottom-3 sm:bottom-4'>
        <img
          src={owner.avatar}
          alt={name}
          draggable={false}
          className='h-16 w-16 sm:h-32 sm:w-32 p-0.5 rounded-full object-cover border-4 border-green-500 border-t-2 border-l-0 '
        />
        <h2 className='text-white bg-1 bg-black/25 group-hover:bg-black/40 mt-3'>
          {name}
        </h2>
      </header>
    </Link>
  );
};
