import "./store.css";
import { useEffect, useState } from "react";
// Images
import bg from "../../assets/images/a3.jpg";
import img from "../../assets/images/a6.jpeg";
// Hook
import useTitle from "../../hooks/useTitle";
// Icon
import { Clock } from "../../assets/icons/icon";
// Redux
import { fetchStores } from "../../features/store/storeSlice";
import { useDispatch, useSelector } from "react-redux";
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

  if (stores_status === "err") {
    return <Error1 />;
  }

  return (
    <section id='stores' className='container mt-6 overflow-hidden'>
      <h3>No of stores ------ {stores.count}</h3>
      <div className='w-full grid grid-cols-12 gap-4'>
        {stores.stores.map((store) => {
          console.log(store);
          return <StoreCard {...store} key={store._id} />;
        })}

        {/* <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard /> */}
      </div>
    </section>
  );
};

export default StorePage;

const StoreCard = ({ name, owner, open }) => {
  const [images, setImages] = useState([bg, img]);
  const [bgImage, setBgImage] = useState(bg);
  // if (items !== undefined && items.length > 0) {
  //   setImages(items);
  // }
  return (
    <div
      className='relative col-span-12 sm:col-span-6 md:col-span-4 group h-60 sm:h-80 w-full overflow-hidden rounded-md cursor-pointer'
      title='Ayeti Adorn'
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
        alt=''
      />

      <header className='w-fit sm:w-full flex flex-col justify-center items-center overflow-hidden absolute left-1 bottom-3 sm:bottom-4'>
        <img
          src={owner.avatar}
          alt={name}
          draggable={false}
          className='h-16 w-16 sm:h-32 sm:w-32 p-0.5 rounded-full object-cover border-4 border-green-500 border-t-2 border-l-0 '
        />
        <h2 className='text-white'>{name}</h2>
      </header>

      <footer></footer>
    </div>
  );
};
