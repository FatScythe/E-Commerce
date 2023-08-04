import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// Toatify
import { toast } from "react-toastify";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleStore,
  storeCrud,
} from "../../../features/store/storeSlice";
import { logoutUser } from "../../../features/user/userSlice";
import { closeModal, showModal } from "../../../features/ui/uiSlice";
// Component
import StoreForm from "../../../component/store";
import Error1 from "../../../component/loaders/error";
import Loader1 from "../../../component/loaders/loader1";

const MyStore = ({ user }) => {
  const dispatch = useDispatch();
  const { singleStore_status, singleStore } = useSelector(
    (store) => store.store
  );

  const [value, setValue] = useState({
    name: "",
    desc: "",
    insta: "",
    fb: "",
    tiktok: "",
    type: "edit",
    loading: false,
    show: false,
    storeId: "",
  });

  useEffect(() => {
    dispatch(fetchSingleStore());
  }, [dispatch]);

  const question = "Are you sure you want to delete store?";
  const positiveFn = () => {
    handleDelete();
    dispatch(closeModal());
  };
  const negativeFn = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    dispatch(storeCrud({ ...value, type: "delete" }));
    toast.success("You will be logged out now for changes to take effect");

    setTimeout(() => {
      toast.dismiss();
      dispatch(logoutUser());
    }, 7000);
  };

  if (user.role === "user") {
    return <Navigate to='/' />;
  }

  if (singleStore_status === "pending") {
    return <Loader1 />;
  }

  if (singleStore_status === "err") {
    return <Error1 />;
  }

  if (singleStore === undefined) {
    return <Error1 />;
  }

  const { name } = singleStore.store;

  return (
    <section>
      <h2 className='capitalize font-semibold text-xl sm:text-2xl mb-10'>
        My Store
      </h2>
      <div className='my-10 flex justify-between items-center'>
        <h3 className='italic capitalize sm:text-lg font-semibold'>{name}</h3>
        <button
          className='bg-tomato py-2 px-3 text-white sm:text-base rounded-md'
          onClick={() =>
            dispatch(
              showModal({ open: true, question, positiveFn, negativeFn })
            )
          }
        >
          delete store
        </button>
      </div>
      <StoreForm value={value} store={singleStore} setValue={setValue} />
    </section>
  );
};

export default MyStore;
