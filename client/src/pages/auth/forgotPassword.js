import "./auth.css";
import { useState } from "react";

// Component
import NotNav from "../../component/noNavHeader";
import Banner from "../../component/banner/banner";

const ForgotPwd = () => {
  const [email, setEmail] = useState("");
  return (
    <section className='auth md:mx-auto md:px-2'>
      <div className='ml-3 mr-2'>
        <NotNav navLinks={{ cart: "cart", search: "search", store: "store" }} />
      </div>

      <div className='auth-wrapper'>
        <div className='inner'>
          <Banner />
          <main className='forgot-pwd px-10'>
            <h1 className='text-center capitalize'>forgot password</h1>
            <form>
              <div className='input-wrapper'>
                <input
                  type='text'
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='peer placeholder'
                />
                <label
                  htmlFor='Email'
                  className='top-0 left-0 origin-left -translate-y-1/2 transform text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
                >
                  Email
                </label>
              </div>

              <button type='submit' className='submit-btn mt-6'>
                get reset password link
              </button>
            </form>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ForgotPwd;
