import { Link, useNavigate } from "react-router-dom";
// Components
import { ArrowUpRight } from "../../assets/icons/icon";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { storeCrud, fetchMyStore } from "../../features/store/storeSlice";
import { logoutUser } from "../../features/user/userSlice";

const StoreForm = ({ value, setValue, store }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const handleSubmit = (e) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setValue({ ...value, loading: true });
    e.preventDefault();
    const { name, desc } = value;
    if ((!name, !desc)) {
      toast.error("Please provide store name and description");
      setValue({ ...value, loading: false });
      return;
    }

    dispatch(storeCrud({ ...value, storeId: store ? store.store._id : "" }));

    if (value.type === "edit") {
      setTimeout(() => {
        dispatch(fetchMyStore());
      }, 3000);
    }
    if (value.type === "add") {
      dispatch(logoutUser());
    }
    setValue({ ...value, loading: false });
  };

  return (
    <form onSubmit={handleSubmit} className='mt-5'>
      {value.show && <p>Please note you will be logged out</p>}
      <main className='grid grid-cols-12 gap-3'>
        <div className='col-span-12 sm:col-span-6'>
          <label className='block font-bold pb-2'>Store Name</label>
          <input
            type='text'
            value={value.name}
            placeholder={store ? store.store.name : "Enter your store name"}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base border border-transparent focus:border-black focus:border-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
          />
        </div>

        <div className='col-span-12 sm:col-span-6'>
          <label className='block font-bold pb-2'>Instagram Link</label>
          <input
            type='text'
            value={value.insta}
            placeholder={
              store
                ? store.store.insta
                  ? store.store.insta
                  : "Instagram username"
                : "Instagram username"
            }
            onChange={(e) => setValue({ ...value, insta: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base border border-transparent focus:border-black focus:border-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
          />
        </div>

        <div className='col-span-12 sm:col-span-6'>
          <label className='block font-bold pb-2'>Facebook Link</label>
          <input
            type='text'
            value={value.fb}
            placeholder={
              store
                ? store.store.fb
                  ? store.store.fb
                  : "Facebook username"
                : "Facebook uername"
            }
            onChange={(e) => setValue({ ...value, fb: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base border border-transparent focus:border-black focus:border-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
          />
        </div>

        <div className='col-span-12 sm:col-span-6'>
          <label className='block font-bold pb-2'>TikTok Link</label>
          <input
            type='text'
            value={value.tiktok}
            placeholder={
              store
                ? store.store.tiktok
                  ? store.store.tiktok
                  : "Tiktok username"
                : "Tiktok username"
            }
            onChange={(e) => setValue({ ...value, tiktok: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base border border-transparent focus:border-black focus:border-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2'
          />
        </div>

        <div className='col-span-12 row-start-3 row-end-5'>
          <label className='block font-bold pb-2'>Description</label>
          <textarea
            placeholder={
              store ? store.store.desc : "Describe your store and products"
            }
            rows='10'
            value={value.desc}
            onChange={(e) => setValue({ ...value, desc: e.target.value })}
            className='bg-gray-300/30 w-full outline-none p-2 text-base border border-transparent focus:border-black focus:border-2 placeholder:text-normal placeholder:text-slate-700 placeholder:pl-2 resize-none'
          ></textarea>
        </div>
      </main>
      <div className='my-4 flex gap-3 mb-10 flex-col justify-center items-center'>
        {user ? (
          <button
            type='submit'
            disabled={value.loading}
            className='w-full sm:w-1/2 disabled:bg-gray-500 bg-black hover:bg-black/80 px-6 py-2 text-white focus:bg-gray-600 focus:outline-none first-letter:uppercase'
          >
            {value.type === "add" ? " create store" : "edit store"}
          </button>
        ) : (
          <button
            type='submit'
            disabled={value.loading}
            className='w-full sm:w-1/2 disabled:bg-gray-500 bg-black hover:bg-black/80 px-6 py-2 text-white focus:bg-gray-600 focus:outline-none first-letter:uppercase'
          >
            please login / sign-up
          </button>
        )}
        {user ? (
          value.show && (
            <Link
              to='user/products'
              className='w-fit hover:text-blue-500 hover:border-b-blue-400 text-base flex justify-center items-center border border-transparent border-b-black pb-3'
            >
              My Products <ArrowUpRight />
            </Link>
          )
        ) : (
          <div></div>
        )}
      </div>
    </form>
  );
};

export default StoreForm;
