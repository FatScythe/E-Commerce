import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Footer from "./component/footer/footer";
import Navbar from "./component/navbar/navbar";
import Modal from "./component/modal";

import { useState } from "react";
// Pages
import { navLinks } from "./assets/data/navData";
// Redux
import { useSelector } from "react-redux";

// Toastify
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  // const notify = () =>
  //   toast.error("Wow so easy!", {
  //     // position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  const { showNav } = useSelector((store) => store.ui);
  const [modal, setModal] = useState({
    open: true,
    question: "",
    positiveFn: null,
    negativeFn: null,
  });

  const showModal = (open = true, question = "", positiveFn, negativeFn) => {
    setModal({ open, question, positiveFn, negativeFn });
  };

  return (
    <div className='App'>
      <Router>
        <Modal modal={modal} showModal={showModal} />
        {showNav && <Navbar />}

        {/* <ToastContainer position='top-center' /> */}
        <Routes>
          {navLinks.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
        </Routes>
        {/* <button onClick={notify}>Test</button> */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
