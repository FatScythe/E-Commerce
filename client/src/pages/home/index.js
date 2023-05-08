import "./home.css";
import { useEffect } from "react";
// Redux
import { showNav, showModal, closeModal } from "../../features.js/ui/uiSlice";
import { useDispatch } from "react-redux";
// Hooks
import useTitle from "../../hooks/useTitle";

const HomePage = () => {
  const dispatch = useDispatch();
  useTitle("Home || Ayeti Adorn");

  const question = "lorem ipsum dolor sit amet";
  const positiveFn = () => {
    console.log("Home Positive fn");
    dispatch(closeModal());
  };
  const negativeFn = () => {
    console.log("Home negative fn");
    dispatch(closeModal());
  };

  useEffect(() => {
    dispatch(showNav());
  }, [dispatch]);

  return (
    <section id='home' className='container'>
      <h2>
        HOME
        <button
          onClick={() => {
            dispatch(
              showModal({ open: true, question, positiveFn, negativeFn })
            );
          }}
        >
          ShowNav
        </button>
      </h2>
    </section>
  );
};

export default HomePage;
