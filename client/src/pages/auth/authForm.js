import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Component
import { EyeClose, EyeOpen } from "../../assets/icons/icon";

// Toastify
import { toast } from "react-toastify";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../features/user/userSlice";

// Router
import { useNavigate } from "react-router-dom";

const AuthForm = ({ value, setValue, handleToggleMember }) => {
  const passwordInputContainer = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.user);
  const handleShowPassword = (e) => {
    e.preventDefault();
    if (!value.password) return;
    setValue({ ...value, showPassword: !value.showPassword });
    value.showPassword
      ? passwordInputContainer.current.setAttribute("type", "password")
      : passwordInputContainer.current.setAttribute("type", "text");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = value;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }

    if (value.isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <main className='form'>
      <form onSubmit={handleSubmit}>
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
                  className='peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none'
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
            <div className='input-wrapper relative'>
              <button className='absolute right-0' onClick={handleShowPassword}>
                {value.showPassword ? <EyeClose /> : <EyeOpen />}
              </button>
              <input
                type='password'
                placeholder='Password'
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
                value={value.password}
                ref={passwordInputContainer}
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
              <button type='submit' className='submit-btn' disabled={loading}>
                {value.isMember
                  ? loading
                    ? "loading"
                    : "login"
                  : loading
                  ? "registering"
                  : "sign-in"}
              </button>
            </div>
            <p className='first-letter:uppercase text-center text-sm text-gray-500'>
              {value.isMember
                ? "don't have an account yet?"
                : "already have and account?"}
              <button
                type='button'
                onClick={handleToggleMember}
                className='capitalize font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none'
              >
                {value.isMember ? "sign up" : "login"}
              </button>
              .
              {value.isMember && (
                <Link
                  to='/auth/forgot-password'
                  className='block capitalize font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none mx-auto'
                >
                  forgot password ?
                </Link>
              )}
            </p>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AuthForm;
