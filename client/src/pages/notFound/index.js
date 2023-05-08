import "./notfound.css";
import { useEffect } from "react";
// Redux
import { showNav } from "../../features.js/ui/uiSlice";
import { useDispatch } from "react-redux";
// Hook
import useTitle from "../../hooks/useTitle";
const NotFound = () => {
  useTitle("Page Not Found");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showNav(true));
  }, [dispatch]);

  return (
    <section id='not-found' className='container text-red-700 text-xl'>
      404? NOT FOUND!!!
    </section>
  );
};

export default NotFound;
