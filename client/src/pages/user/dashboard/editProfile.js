import { useState } from "react";
// Toastify
import { toast } from "react-toastify";
// Utils
import url from "../../../utils/url";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { saveUser, removeUser } from "../../../features/user/userSlice";

// Component
import { EditIcon } from "../../../assets/icons/icon";

const EditProfile = ({ user }) => {
  const [image, setImage] = useState(null);
  const [value, setValue] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    loading: false,
  });

  const dispatch = useDispatch();

  const { dark } = useSelector((store) => store.ui);

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

  const handleAvatar = async () => {
    setValue({ ...value, loading: true });

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    formData.append("folder", "Ayeti-Adorn/users");

    try {
      toast.loading("Uploading image...");

      // UPLOADING TO CLOUDINARY
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.dismiss();
        toast.error("Unable to upload Image");
        setValue({ ...value, loading: false });
        return;
      }

      toast.dismiss();

      return data.secure_url;
    } catch (error) {
      toast.dismiss();
      console.error(error);
    }
  };

  const handleSubmit = async (e, uplodedImageURL = user.avatar) => {
    e.preventDefault();
    const { name, email } = value;
    try {
      if (!email || !name) {
        toast.error("Please fill all fields");
        setValue({ ...value, loading: false });
        return;
      }

      // UPLOADING TO SERVER
      const response = await fetch(url + "/api/v1/users/update", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, avatar: uplodedImageURL }),
      });

      const data = await response.json();

      if (!response.ok) {
        setValue({ ...value, loading: false });
        toast.error(data.msg);
        return;
      }
      toast.dismiss();

      setValue({ ...value, loading: false });
      fetchUser();
      toast.success(data.msg);
    } catch (error) {
      toast.dismiss();
      console.error(error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1048576) {
      toast.error("Image size must not be more than 1MB");
      return;
    }
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setValue({ ...value, avatar: reader.result });
    };
    const avatarUrl = await handleAvatar();
    if (!avatarUrl) return;
    handleSubmit(e, avatarUrl);
  };

  return (
    <section id='edit-prof'>
      <h2
        className={`capitalize font-semibold text-xl sm:text-2xl mb-10 ${
          dark ? "text-white" : "text-black"
        }`}
      >
        edit profile
      </h2>
      <form className='sm:w-9/12 mr-auto' onSubmit={(e) => handleSubmit(e)}>
        <div className='mt-6 flex flex-col md:flex-row justify-start gap-5 items-center'>
          <img
            src={value.avatar}
            alt={value.name}
            className='w-60 h-60 rounded-full object-cover border-blue-400 border-4 border-b-0 p-1'
          />

          <div>
            <input
              id='hidden-input'
              type='file'
              className='hidden'
              onChange={handleImageChange}
              accept='image/*'
            />

            <label htmlFor='hidden-input' className='cursor-pointer sm:w-2/6'>
              <div className='mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none flex justify-center items-center gap-1'>
                <EditIcon /> Upload an image
              </div>
            </label>
          </div>
        </div>

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
            disabled={value.loading}
          >
            {value.loading ? "updating" : "edit profile"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProfile;
