import "./user.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Toastify
import { toast } from "react-toastify";

// Redux
import { useSelector } from "react-redux";

// Utils
import url from "../../utils/url";

const ResetPwd = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const passwordToken = queryParameters.get("token");
  const email = queryParameters.get("email");
  const { dark } = useSelector((store) => store.ui);

  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Please input a valid password");
      return;
    }

    try {
      const response = await fetch(url + "/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, passwordToken, newPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg);
        return;
      }

      toast.success(data.msg);
      navigate("/auth");
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  return (
    <div id='reset-pwd' className='container mt-20'>
      <h2
        className={`capitalize font-semibold text-xl sm:text-2xl mb-10 ${
          dark ? "text-white" : "text-black"
        }`}
      >
        reset password
      </h2>
      <p>Email: {email}</p>
      <form>
        <div className='input-wrapper'>
          <input
            type='password'
            placeholder='New Password'
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            className='peer placeholder'
          />
          <label
            htmlFor='Password'
            className='top-0 left-0 origin-left -translate-y-1/2 transform text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800'
          ></label>
        </div>

        <button className='submit-btn mt-6' onClick={(e) => changePassword(e)}>
          new password
        </button>
      </form>
    </div>
  );
};

export default ResetPwd;
