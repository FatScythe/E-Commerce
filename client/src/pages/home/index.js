import "./home.css";
import { useEffect } from "react";
// Redux
import { showNav } from "../../features.js/ui/uiSlice";
import { useDispatch } from "react-redux";
// Hooks
import useTitle from "../../hooks/useTitle";

const HomePage = () => {
  const dispatch = useDispatch();
  useTitle("Home || Ayeti Adorn");

  useEffect(() => {
    dispatch(showNav());
  }, [dispatch]);

  return (
    <section id='home' className='container'>
      <h2>HOME</h2>
    </section>
  );
};

export default HomePage;
