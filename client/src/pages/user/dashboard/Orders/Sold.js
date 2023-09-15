import { Link } from "react-router-dom";

const Sold = ({ user }) => {
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
  return <div className='h-screen'></div>;
};

export default Sold;
