// Component
import { LogoutIcon } from "../../assets/icons/icon";
// Redux
import { useDispatch } from "react-redux";
import { showModal, closeModal } from "../../features/ui/uiSlice";
import { logoutUser } from "../../features/user/userSlice";
import { useEffect, useState } from "react";

const Logout = () => {
  const [logout, setLogout] = useState(false);
  const dispatch = useDispatch();
  const question = "Are you sure you want to logout?";
  const positiveFn = () => {
    setLogout(true);
    dispatch(closeModal());
  };
  const negativeFn = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (logout) {
      dispatch(logoutUser());
    }
  }, [logout, dispatch]);

  return (
    <button
      className='sm:mt-3 bg-tomato text-white flex justify-center items-center my-0 mx-auto px-3 py-2 w-3/4 rounded-md'
      onClick={() =>
        dispatch(showModal({ open: true, question, positiveFn, negativeFn }))
      }
    >
      <span className='sm:hidden md:flex'>logout</span> <LogoutIcon />
    </button>
  );
};

export default Logout;
