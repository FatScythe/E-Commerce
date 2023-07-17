import { useState } from "react";
// Toastify
import { toast } from "react-toastify";
// Utils
import url from "../../../utils/url";

// Redux
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../features/user/userSlice";

const ChangePassword = () => {
  const [value, setValue] = useState({
    oldPwd: "",
    newPwd: "",
    loading: false,
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValue({ ...value, loading: true });

    const { oldPwd, newPwd } = value;
    if (!oldPwd || !newPwd) {
      toast.error("Please fill all field");
      setValue({ ...value, loading: false });
      return;
    }

    if (oldPwd.toLowerCase() === newPwd.toLowerCase()) {
      toast.error("Old and New Password cannot be the same");
      setValue({ oldPwd: "", newPwd: "", loading: false });
      return;
    }

    const response = await fetch(url + "/api/v1/users/updatePwd", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ newPassword: newPwd, oldPassword: oldPwd }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.msg);
      setValue({ oldPwd: "", newPwd: "", loading: false });
      return;
    }

    toast.success(data.msg);

    dispatch(logoutUser());
  };

  return (
    <section id='change-pwd'>
      <form className='sm:w-9/12 mr-auto' onSubmit={(e) => handleSubmit(e)}>
        <div className='relative mt-6'>
          <input
            type='password'
            placeholder='Old Password'
            onChange={(e) => {
              setValue({ ...value, oldPwd: e.target.value });
            }}
            value={value.oldPwd}
            className='peer mt-1 text-lg w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-lg placeholder:text-transparent focus:border-gray-500 focus:outline-none'
          />
          <label
            htmlFor='old password'
            className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 pointer-events-none absolute'
          >
            Old Password
          </label>
        </div>

        <br />
        <br />
        <br />

        <div className='relative'>
          <input
            type='password'
            placeholder='New Password'
            onChange={(e) => {
              setValue({ ...value, newPwd: e.target.value });
            }}
            value={value.newPwd}
            className='peer text-lg mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-lg placeholder:text-transparent focus:border-gray-500 focus:outline-none'
          />
          <label
            htmlFor='email'
            className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 pointer-events-none absolute'
          >
            New Password
          </label>
        </div>

        <div className='my-14'>
          <button
            type='submit'
            className='w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none first-letter:uppercase'
            disable={value.loading}
          >
            {value.loading ? "updating" : "change password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;
