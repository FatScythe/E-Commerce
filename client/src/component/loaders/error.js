import { RefreshIcon } from "../../assets/icons/icon";
const Error1 = ({ msg }) => {
  return (
    <section id='error1' className='flex flex-col justify-center items-center'>
      <h3 className='text-2xl text-red-400'>Error</h3>
      <p className='text-xl italic'>{msg ? msg : "Something went wrong"} : )</p>
      <button
        className='flex gap-2 w-fit items-center my-5 bg-black text-white border-2 hover:border-black hover:bg-transparent hover:text-black rounded-3xl p-4  transition-all duration-500 ease-in-out'
        onClick={() => window.location.reload(true)}
      >
        <RefreshIcon /> refresh
      </button>
    </section>
  );
};

export default Error1;
