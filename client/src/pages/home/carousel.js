import "./carousel.css";
import { useEffect, useMemo, useState } from "react";
// Images
import img0 from "../../assets/images/a3.jpg";
import img1 from "../../assets/images/a6.jpeg";
import img2 from "../../assets/images/a7.jpeg";
import img3 from "../../assets/images/a9.jpeg";
import img4 from "../../assets/images/b2.jpeg";
// Component
import { ArrowLeft } from "../../assets/icons/icon";
import { ArrowRight } from "../../assets/icons/icon";

const Carousel = () => {
  const images = useMemo(() => [img0, img1, img2, img3, img4], []);
  const [value, setValue] = useState(1);
  const length = images.length;

  const handlePrevious = () => {
    const newIndex = value - 1;
    setValue(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = value + 1;
    setValue(newIndex >= length ? 0 : newIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const newIndex = value - 1;
      setValue(newIndex < 0 ? length - 1 : newIndex);
    }, 3000);

    return () => clearTimeout(timer);
  }, [value, images, length]);

  return (
    <header className='carousel'>
      <div className='images'>
        {images.map((img, index) => {
          let position = "next-slide";

          if (index === value) {
            position = "active-slide";
          }
          if (index === value - 1 || (value === 0 && index === length - 1)) {
            position = "prev-slide";
          }
          return (
            <img
              className={position}
              src={img}
              key={index}
              alt='featured products'
              draggable={false}
            />
          );
        })}
      </div>
      <button onClick={handlePrevious} className='ctrl left-1'>
        <ArrowLeft />
      </button>
      <button onClick={handleNext} className='ctrl right-1'>
        <ArrowRight />
      </button>

      <div className='toggle'>
        {images.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => setValue(index)}
              className={`skip ${
                index === value ? "bg-white w-4 h-4" : "bg-gray-500"
              }`}
            ></button>
          );
        })}
      </div>

      <div className='title'>
        <h1>shop for handmade items here</h1>
        <p className='font-semibold first-letter:text-lg'>
          Your go-to online destination for handmade clothing items that exude
          creativity and craftsmanship.
          <span className='hidden sm:inline'>
            Our stores are a sanctuary for those who appreciate the artistry
            behind each stitch and value individuality in fashion.
          </span>
        </p>
        {/* <p>
       
       From intricately hand-embroidered dresses to cozy
          hand-knitted sweaters, our collection encompasses a wide spectrum of
          styles, all created by skilled artisans from around the world.
          We prioritize quality and sustainability, using eco-friendly materials
          and championing fair trade practices. When you shop with us, you're
          not just buying clothing; you're investing in wearable art that
          supports artisans and preserves timeless traditions. Explore Artisan
          Attire today and elevate your wardrobe with unique, ethically-made
          pieces that tell a story.
        </p> */}
        <button className='border border-black rounded-3xl px-2 py-3'>
          shop now
        </button>
      </div>
    </header>
  );
};

export default Carousel;
