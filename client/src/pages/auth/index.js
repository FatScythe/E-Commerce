import "./auth.css";
import { useState } from "react";
// Hooks
import useTitle from "../../hooks/useTitle";
import useShowNav from "../../hooks/useShowNav";

// Components
import NotNav from "../../component/noNavHeader";
import AuthForm from "./authForm";
import Banner from "../../component/banner/banner";

const Auth = () => {
  useShowNav(false);
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
      <div className='ml-3 mr-2'>
        <NotNav navLinks={{ cart: "cart", search: "search", store: "store" }} />
      </div>

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
