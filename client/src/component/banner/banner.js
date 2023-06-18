import { useEffect, useMemo, useState } from "react";
// Images
import img0 from "../../assets/images/b1.jpeg";
import img1 from "../../assets/images/b2.jpeg";
import img2 from "../../assets/images/b3.jpeg";
import img3 from "../../assets/images/b4.jpeg";
import img4 from "../../assets/images/b5.jpeg";
import img5 from "../../assets/images/b6.jpeg";
import img6 from "../../assets/images/b7.jpeg";

const Banner = () => {
  const [value, setValue] = useState(0);

  const images = useMemo(() => [img0, img1, img2, img3, img4, img5, img6], []);

  useEffect(() => {
    const number = () => {
      const last = images.length - 1;

      if (value >= last) {
        return 0;
      }

      if (value < 0) {
        return last;
      }

      return value + 1;
    };
    const timer = setTimeout(() => {
      setValue(number());
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [value, images]);

  return (
    <aside className='banner'>
      <img src={images[value]} alt='banner-img' />

      <div className='btn-container'>
        {images.map((image, index) => {
          return (
            <button
              onClick={() => {
                setValue(index);
              }}
              className={`border-2 ${
                index === value ? "bg-black" : "bg-white"
              } border-white p-0.5 rounded-full`}
              key={index}
            ></button>
          );
        })}
      </div>
    </aside>
  );
};

export default Banner;
