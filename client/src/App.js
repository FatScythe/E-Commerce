import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

// Product
import { fetchProducts } from "./features/product/productSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const ui = useSelector((store) => store.ui);

  useEffect(() => {
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
                    {ui.showNav && <Navbar />}
                    {route.element}
                    <Footer />
                  </>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
