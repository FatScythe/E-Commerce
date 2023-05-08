import "./auth.css";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// Component
// import { ChevronLeft } from "../../assets/icons/icon";
import NotNav from "../../component/noNavHeader/wannabeNav";
// Redux
import { useDispatch } from "react-redux";
import { showNav } from "../../features.js/ui/uiSlice";
// Hooks
import useTitle from "../../hooks/useTitle";

const Auth = () => {
  useTitle("Login || Register");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showNav(false));
  }, [dispatch]);

  const initialValue = {
    name: "",
    email: "",
    password: "",
    isMember: false,
  };
  const [value, setValue] = useState(initialValue);

  const handleToggleMember = () => {
    setValue({ ...value, isMember: !value.isMember });
  };

  return (
    <section className='auth'>
      <aside className='banner'>banner</aside>
      <main className='form'>
        <NotNav />
        <div className='form-wrapper'>
          <div className='w-full'>
            <div className='text-center'>
              <h1>{value.isMember ? "login" : "sign up"}</h1>
              {!value.isMember && <p>sign up below to access your account</p>}
            </div>
            {!value.isMember && (
              <div className='input-wrapper'>
                <input
                  type='text'
                  placeholder='Name'
                  onChange={(e) => setValue({ ...value, name: e.target.value })}
                  value={value.name}
                  className='peer'
                />
                <label
                  htmlFor='name'
                  className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  Name
                </label>
              </div>
            )}
            <div className='input-wrapper'>
              <input
                type='email'
                placeholder='Email Address'
                onChange={(e) => setValue({ ...value, email: e.target.value })}
                value={value.email}
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
                placeholder='Password'
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
                value={value.password}
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
              {value.isMember
                ? "don't have an account yet?"
                : "already have and account?"}
              <button
                onClick={handleToggleMember}
                className='capitalize font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none'
              >
                {value.isMember ? "sign up" : "login"}
              </button>
              .
              <button className='block capitalize font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none mx-auto'>
                forgot password ?
              </button>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Auth;
