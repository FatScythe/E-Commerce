import "./store.css";
import { useEffect } from "react";
// Hook
import useTitle from "../../hooks/useTitle";
//Redux
import { useDispatch } from "react-redux";
import { showNav } from "../../features.js/ui/uiSlice";

const StorePage = () => {
  useTitle("Store");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showNav());
  }, [dispatch]);
  return (
    <section id='store' className='container'>
      <h1>STORES</h1>
    </section>
  );
};

export default StorePage;
