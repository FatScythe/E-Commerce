import "./user.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPwd = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("token");
  const email = queryParameters.get("email");

  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const changePassword = () => {
    console.log(token, email);
    //    Send email, passwordToken, newPassword;
    // and finally take them back to the login page

    navigate("/auth");
  };

  return (
    <div id='reset-pwd' className='container mt-20'>
      <h1 className='text-2xl font-semibold text-center capitalize'>
        reset password
      </h1>
      <p>Token: {token}</p>
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

        <button
          type='submit'
          className='submit-btn mt-6'
          onClick={changePassword}
        >
          new password
        </button>
      </form>
    </div>
  );
};

export default ResetPwd;
