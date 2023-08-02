import { useState, useEffect } from "react";
import { ChevronRight } from "../../assets/icons/icon";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Ad = () => {
  const [nav, setNav] = useState(false);
  const { user } = useSelector((store) => store.user);

  const changeNav = () => {
    window.scrollY <= 150 ? setNav(true) : setNav(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);

    return () => window.removeEventListener("scroll", changeNav);
  }, []);

  if (user && user.role !== "user") {
    return <></>;
  }
  return (
    <Link
      to='/vendor'
      className={`fixed overflow-hidden flex justify-between items-center transition-all top-0 left-0 right-0 duration-500 bg-black md:bg-primary w-full text-white ${
        !nav ? "h-0 -top-40" : "h-8 sm:h-8 z-50"
      }`}
    >
      <span className='basis-11/12 text-sm sm:text-normal sm:font-semibold text-center'>
        Own a store, become a vendor and get up to 90% payback
      </span>
      <span className='basis-1/12 flex justify-end items-center'>
        <ChevronRight />
      </span>
    </Link>
  );
};

export default Ad;
