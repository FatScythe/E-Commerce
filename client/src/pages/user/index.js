// Hooks
import useTitle from "../../hooks/useTitle";
// Components
// import NotNav from "../../component/noNavHeader";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const User = () => {
  useTitle("User");
  const { user } = useSelector((store) => store.user);
  console.log(user);
  if (!user) {
    return <Navigate to='/' />;
  }
  return (
    <section id='user' className='grid grid-cols-12'>
      <aside className='col-span-3 h-screen bg-blue-500 '>
        {/* logo Here maybe?? AYETI ADORN*/}
        <h4 className='title mb-10 flex flex-col md:flex-row justify-center items-center gap-5'>
          <img
            className='h-24 w-24 border border-red-500 rounded-full'
            src='http://localhost:3000/img.png'
            alt='name'
          />
          <p className='font-semibold text-white'>Abdullahi Fahm</p>
        </h4>

        <nav className='bg-transparent p-0'>
          <ul className='ml-4 w-full bg-transparent'>
            <li className='w-full my-6 p-3 rounded-l-md  text-black font-bold   bg-white'>
              Home
            </li>
            <li className='my-6'>Edit profile</li>
            <li className='my-6'>Change Password</li>
            <li className='my-6'>My Store</li>
            <li className='my-6'>My Products</li>
            <li className='my-6'>Orders</li>
          </ul>
        </nav>

        <button>Logout</button>
      </aside>
      <main className='col-span-9 h-full'></main>
    </section>
  );
};

export default User;
