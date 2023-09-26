import { Link } from "react-router-dom";
// Hook
import useSWR from "swr";
// Component
import OrderCard from "./OrderCard";
import Loader1 from "../../../../component/loaders/loader1";
import Error1 from "../../../../component/loaders/error";
// Utils
import url from "../../../../utils/url";

const Sold = ({ user }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    url + "/api/v1/orders/showCurrentUserSales",
    fetcher
  );

  if (user.role === "user") {
    return (
      <div className='text-center mt-10'>
        <h2 className='text-lg sm:text-xl font-semibold'>Become a Vendor ?</h2>
        <p className='text-base'>Get Up to 90% pay back on all items sold</p>
        <Link
          to=''
          className='block mx-auto text-base my-5 bg-black text-white border-2 hover:border-black hover:bg-transparent hover:text-black rounded-3xl w-full sm:w-3/4 p-4 transition-all duration-500 ease-in-out'
        >
          Click here to get started
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div>
        <Loader1 />
      </div>
    );
  }

  if (error || (data && data?.msg)) {
    const message = error ? error.message : data.msg;
    return (
      <div>
        <Error1 msg={message} />
      </div>
    );
  }

  const { count, sales } = data;

  if (count < 1) {
    return (
      <div className='text-base sm:text-lg mt-10 text-center'>
        You have no sales yet : )
      </div>
    );
  }

  return (
    <>
      {sales.map((sale) => {
        return <OrderCard item={sale} key={sale._id} />;
      })}
    </>
  );
};

export default Sold;
