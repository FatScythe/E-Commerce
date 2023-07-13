import "./user.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Component
import { ErrorIcon } from "../../assets/icons/icon";
// Utils
import url from "../../utils/url";
// Toastify
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryParameters = new URLSearchParams(window.location.search);
  const verificationToken = queryParameters.get("token");
  const email = queryParameters.get("email");

  const verifyEmail = async () => {
    setLoading(true);

    try {
      const response = await fetch(url + "/api/v1/auth/verify-email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ verificationToken, email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        console.log(data.msg);
        return;
      }
      setLoading(false);
      toast.success(data.msg);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

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
      <h1>Account Confirmed</h1>
      <p>Email: {email}</p>
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
