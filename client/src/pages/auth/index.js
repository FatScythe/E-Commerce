import "./auth.css";
import { useEffect, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { showNav } from "../../features.js/ui/uiSlice";
// Hooks
import useTitle from "../../hooks/useTitle";

// Components
import NotNav from "../../component/noNavHeader/wannabeNav";
import AuthForm from "./authForm";
import Banner from "./banner";

const Auth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showNav(false));
  }, [dispatch]);

  const initialValue = {
    name: "",
    email: "",
    password: "",
    isMember: false,
    showPassword: false,
  };

  const [value, setValue] = useState(initialValue);
  useTitle(value.isMember ? "Login" : "Sign Up");

  const handleToggleMember = () => {
    setValue({ ...value, isMember: !value.isMember });
  };

  return (
    <section className='auth md:mx-auto md:px-2'>
      <NotNav navLinks={{ cart: "cart", search: "search" }} />
      <div className='auth-wrapper'>
        <div className='inner'>
          <Banner />
          <AuthForm
            value={value}
            setValue={setValue}
            handleToggleMember={handleToggleMember}
          />
        </div>
      </div>
    </section>
  );
};

export default Auth;
