import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../features/ui/uiSlice";
const Settings = () => {
  const { dark } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  return (
    <section>
      <h2
        className={`capitalize font-semibold text-xl sm:text-2xl mb-10 ${
          dark ? "text-white" : "text-black"
        }`}
      >
        settings
      </h2>
      <main className='m-2'>
        <div
          className='flex justify-between items-center text-base sm:font-semibold bg-gray-200 p-2 cursor-pointer'
          onClick={() => dispatch(toggleTheme())}
        >
          <span className='text-black/80'>Dark theme</span>
          <span
            className={`w-16 h-8 ${
              dark ? "bg-blue-700" : "bg-slate-500"
            }  rounded-3xl relative`}
          >
            <button
              className={`w-8 h-full rounded-full bg-white transition-transform duration-500 ease-in-out absolute ${
                dark ? "translate-x-full" : "translate-x-0"
              } `}
            ></button>
          </span>
        </div>
      </main>
    </section>
  );
};

export default Settings;
