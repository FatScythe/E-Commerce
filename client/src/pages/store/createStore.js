import { useState } from "react";
// Component
import StoreForm from "../../component/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const CreateStore = () => {
  const { user } = useSelector((store) => store.user);
  const [value, setValue] = useState({
    name: "",
    desc: "",
    insta: "",
    fb: "",
    tiktok: "",
    type: "add",
    loading: false,
    show: true,
    storeId: "",
  });

  if (user && user.role === "seller") {
    return <Navigate to='/user/store' />;
  }
  return (
    <section id='create-store' className='container mt-8'>
      <h2 className='text-lg sm:text-xl font-semibold sm:font-bold'>
        Create Store
      </h2>
      <p className='text-base'>
        At Ayeti Adorn we value all our vendors, providing them with the best
        exposure for their business. With only atleast a cost of 5% the on each
        product
      </p>

      <StoreForm value={value} setValue={setValue} />
    </section>
  );
};

export default CreateStore;
