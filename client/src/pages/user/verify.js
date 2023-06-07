import "./user.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorIcon } from "../../assets/icons/icon";

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("token");
  const name = queryParameters.get("email");

  const verifyToken = () => {
    console.log(token, name);
    // setLoading(true);
    // Make the post request and then setError to true in the catch block
  };

  useEffect(() => {
    // If the top level user is still loading do not run this fn
    verifyToken();
  });

  if (error) {
    return (
      <div id='verify-email' className='container'>
        <header
          className='flex gap-4 text-2xl justify-center items-center m-5'
          title='error'
        >
          <span className='border border-transparent rounded-full bg-red-500 text-white p-2'>
            <ErrorIcon />
          </span>
          <span>Error</span>
          <span className='text-blue-700'>: (</span>
        </header>
        <p className='text-lg text-center'>
          There was an error, please double check your verification link.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        id='verify-email'
        className='container grid place-items-center h-screen'
      >
        <h1 className='text-center text-xl animate-pulse tracking-wide'>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div id='verify-email' className='container mt-20'>
      <h1 className='text-2xl font-semibold'>Account Confirmed</h1>
      <p>Token: {token}</p>
      <p>Name: {name}</p>
      <button className='mt-10'>
        <Link
          to='/auth'
          className='border border-black rounded-3xl hover:bg-primary hover:text-white hover:border-none px-4 py-3'
        >
          login
        </Link>
      </button>
    </div>
  );
};

export default VerifyEmail;
