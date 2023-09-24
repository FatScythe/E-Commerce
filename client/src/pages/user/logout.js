// Component
import { LogoutIcon } from "../../assets/icons/icon";
// Redux
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <button
      className='sm:mt-3 bg-tomato text-white flex justify-center items-center my-0 mx-auto px-3 py-2 w-3/4 rounded-md'
      onClick={() => dispatch(logoutUser())}
    >
      <span className='sm:hidden md:flex'>logout</span> <LogoutIcon />
    </button>
  );
};

export default Logout;
