import "./footer.css";
import Accordian from "./accordian/accordian";
import { accordianData } from "../../assets/data/accordianData";
import {
  FBIcon,
  InstaIcon,
  PintrestIcon,
  TikTokIcon,
} from "../../assets/icons/icon";

const Footer = () => {
  return (
    <footer id='footer' className='container'>
      <h1>ayeti adorn</h1>
      <div className='accordian-container'>
        {accordianData.map((accordian) => {
          return <Accordian key={accordian.id} {...accordian} />;
        })}
      </div>

      <div className='my-5 sm:text-center'>
        <h2 className='text-base font-bold sm:text-lg uppercase'>
          Follow us on our social media
        </h2>
        <p className='my-2'>
          Exclusive offers, a heads up on new things, and sightings of
          Ayeti-Adorn in the wild. #adornedByayeti
        </p>
        <div className='flex justify-start sm:justify-center items-center gap-6 my-6 transition-all duration-700'>
          <a target='_blank' href='https://www.instagram.com/ayeti_adorn/'>
            <InstaIcon className='w-6 h-6 hover:scale-150 transition-all duration-300 ease-in-out' />
          </a>
          <a target='_blank' href='https://www.instagram.com/ayeti_adorn/'>
            <TikTokIcon className='w-6 h-6 hover:scale-150 transition-all duration-300 ease-in-out' />
          </a>
          <a target='_blank' href='https://www.instagram.com/ayeti_adorn/'>
            <FBIcon className='w-6 h-6 hover:scale-150 transition-all duration-300 ease-in-out' />
          </a>
          <a target='_blank' href='https://www.instagram.com/ayeti_adorn/'>
            <PintrestIcon className='w-7 h-7 hover:scale-150 transition-all duration-300 ease-in-out' />
          </a>
        </div>
      </div>

      <a
        target='_blank'
        href='https://github.com/FatScythe/E-Commerce'
        className='legal'
      >
        <div>site</div>
        <div>legal & privacy</div>
        <div>cookies</div>
      </a>
    </footer>
  );
};

export default Footer;
