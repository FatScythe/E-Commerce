import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
// Components
import Footer from "./component/footer/footer";
import Navbar from "./component/navbar/navbar";
import Modal from "./component/modal";
// Pages
import { navLinks } from "./assets/data/navData";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Redux
import { fetchProducts } from "./features/product/productSlice";
import { saveUser, removeUser } from "./features/user/userSlice";

import url from "./utils/url";

function App() {
  const dispatch = useDispatch();
  const ui = useSelector((store) => store.ui);

  const fetchUser = async () => {
    try {
      const response = await fetch(url + "/api/v1/users/show");
      if (!response.ok) {
        dispatch(removeUser());
      }
      const data = await response.json();

      dispatch(saveUser(data));
    } catch (error) {
      console.error(error);
      dispatch(removeUser());
    }
  };

  useEffect(() => {
    fetchUser();
    dispatch(fetchProducts());
  });

  return (
    <div className='App'>
      <Router>
        {ui.Modal.open && <Modal />}
        <ToastContainer position='top-center' />

        <Routes>
          {navLinks.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                route.showNav ? (
                  <>
                    <Navbar />
                    {route.element}
                    <Footer />
                  </>
                ) : (
                  route.element
                )
              }
            ></Route>
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
