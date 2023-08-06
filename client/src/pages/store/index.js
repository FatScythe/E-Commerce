import "./store.css";

import bg from "../../assets/images/a3.jpg";
import img from "../../assets/images/a6.jpeg";

// Hook
import useTitle from "../../hooks/useTitle";
import { useState } from "react";
import { Clock } from "../../assets/icons/icon";

const StorePage = () => {
  useTitle("Store");

  return (
    <section id='store' className='container mt-6 overflow-hidden'>
      <div className='w-full grid grid-cols-12 gap-4'>
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
      </div>
    </section>
  );
};

export default StorePage;

const StoreCard = ({ items }) => {
  const [images, setImages] = useState([bg, img]);
  const [bgImage, setBgImage] = useState(bg);
  if (items !== undefined && items.length > 0) {
    setImages(items);
  }
  return (
    <div
      className='relative col-span-12 sm:col-span-6 md:col-span-4 group h-60 sm:h-80 w-full overflow-hidden rounded-md'
      title='Ayeti Adorn'
      onMouseOver={() => setBgImage(images[1])}
      onMouseOut={() => setBgImage(images[0])}
    >
      <div className='absolute top-0 bottom-0 right-0 left-0 bg-black/25'>
        <div className='flex justify-between items-center gap-1 absolute top-2 right-2 z-20 bg-yellowish p-2 rounded-2xl capitalize'>
          <Clock className='w-6 h-6 sm:h-4 sm:w-4 text-white' />
          <span className='sm:text-sm'>closed</span>
        </div>
      </div>
      <img
        src={bgImage}
        draggable={false}
        className='transform scale-100 group-hover:scale-125 transition-all duration-500 object-bottom sm:bg-cover'
        alt=''
      />

      <header className='w-fit sm:w-full flex flex-col justify-center items-center overflow-hidden absolute left-1 bottom-3 sm:bottom-4'>
        <img
          src={img}
          alt=''
          draggable={false}
          className='h-16 w-16 sm:h-32 sm:w-32 p-0.5 rounded-full object-cover border-4 border-green-500 border-t-2 border-l-0 '
        />
        <h2 className='text-white'>Ayeti Adorn</h2>
      </header>

      <footer></footer>
    </div>
  );
};
