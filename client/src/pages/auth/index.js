import { useState } from "react";
import "./auth.css";

const Auth = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
    isMember: "",
  };
  const [value, setValue] = useState(initialValue);

  return (
    <main className='auth'>
      <aside className='banner'>banner</aside>
      <section className='form'>
        <div className='form-wrapper'>
          <div className='w-full'>
            <div className='text-center'>
              <h1>sign in</h1>
              <p>sign in below to access your account</p>
            </div>
            <form>
              <div className='input-wrapper'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  className='peer'
                />
                <label
                  htmlFor='name'
                  className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  Name
                </label>
              </div>
              <div className='input-wrapper'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email Address'
                  className='peer'
                  autoComplete='NA'
                />
                <label
                  htmlFor='email'
                  className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  Email Address
                </label>
              </div>
              <div className='input-wrapper'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='peer'
                />
                <label
                  htmlFor='password'
                  className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  Password
                </label>
              </div>
              <div className='my-6'>
                <button type='submit' className='submit-btn'>
                  sign in
                </button>
              </div>
              <p className='first-letter:uppercase text-center text-sm text-gray-500'>
                don&#x27;t have an account yet?
                <a
                  href='#!'
                  className='capitalize font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none'
                >
                  sign up
                </a>
                .
                <a
                  href='#!'
                  className='block capitalize font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none'
                >
                  forgot password ?
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;
