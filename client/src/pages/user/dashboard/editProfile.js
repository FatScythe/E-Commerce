import { useState } from "react";
// Toastify
import { toast } from "react-toastify";
// Utils
import url from "../../../utils/url";

// Redux
import { useDispatch } from "react-redux";
import { saveUser, removeUser } from "../../../features/user/userSlice";

const EditProfile = ({ user }) => {
  const [value, setValue] = useState({
    name: user.name,
    email: user.email,
    loading: false,
  });

  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const response = await fetch(url + "/api/v1/users/show");
      if (!response.ok) {
        dispatch(removeUser());
      }
      const data = await response.json();

      dispatch(saveUser(data));
    } catch (error) {
      console.error(error);
      dispatch(removeUser());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = value;
    setValue({ ...value, loading: true });
    if (!email || !name) {
      toast.error("Please fill all fields");
      return;
    }
    const response = await fetch(url + "/api/v1/users/update", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      setValue({ ...value, loading: false });

      toast.error(data.msg);
      return;
    }

    setValue({ ...value, loading: false });
    fetchUser();
    toast.success(data.msg);
  };

  return (
    <section id='edit-prof'>
      <form className='sm:w-9/12 mr-auto' onSubmit={(e) => handleSubmit(e)}>
        <div className='relative mt-6'>
          <input
            type='text'
            placeholder='Name'
            onChange={(e) => {
              setValue({ ...value, name: e.target.value });
            }}
            value={value.name}
            className='peer mt-1 text-lg w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-lg placeholder:text-transparent focus:border-gray-500 focus:outline-none'
          />
          <label
            htmlFor='name'
            className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 pointer-events-none absolute'
          >
            Name
          </label>
        </div>

        <br />
        <br />
        <br />

        <div className='relative'>
          <input
            type='email'
            placeholder='Email'
            onChange={(e) => {
              setValue({ ...value, email: e.target.value });
            }}
            value={value.email}
            className='peer text-lg mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-lg placeholder:text-transparent focus:border-gray-500 focus:outline-none'
          />
          <label
            htmlFor='email'
            className='top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-normal peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800 pointer-events-none absolute'
          >
            Email
          </label>
        </div>

        <div className='my-14'>
          <button
            type='submit'
            className='w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none first-letter:uppercase'
            disable={value.loading ? true : false}
          >
            {value.loading ? "updating" : "edit profile"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
