// Pages
import Home from "../../pages/home";
import Store from "../../pages/store";
import CreateStore from "../../pages/store/createStore";
import Search from "../../pages/search";
import Auth from "../../pages/auth";
import Cart from "../../pages/cart";
import User from "../../pages/user";
import About from "../../pages/about";
import Contact from "../../pages/contact";
import Product from "../../pages/products";
import SingleProduct from "../../pages/products/singleProduct/index.js";
import VerifyEmail from "../../pages/user/verify";
import ForgotPwd from "../../pages/auth/forgotPassword";
import ResetPwd from "../../pages/user/resetPassword";
import Checkout from "../../pages/cart/checkout";

// Not Found : ( 404
import NotFound from "../../pages/notFound";

export const navLinks = [
  {
    id: 1,
    path: "/",
    showNav: true,
    element: <Home />,
  },
  {
    id: 2,
    path: "/stores",
    showNav: true,
    element: <Store />,
  },
  {
    id: 2.1,
    path: "/vendor",
    showNav: true,
    element: <CreateStore />,
  },
  {
    id: 3,
    path: "/search",
    showNav: false,
    element: <Search />,
  },
  {
    id: 4,
    path: "/auth",
    showNav: false,
    element: <Auth />,
  },
  {
    id: 5,
    path: "/about",
    showNav: true,
    element: <About />,
  },
  {
    id: 6,
    path: "/contact",
    showNav: true,
    element: <Contact />,
  },
  {
    id: 7,
    path: "/cart",
    showNav: false,
    element: <Cart />,
  },
  {
    id: 7.1,
    path: "/checkout",
    showNav: false,
    element: <Checkout />,
  },
  {
    id: 8,
    path: "/user/*",
    showNav: false,
    element: <User />,
  },
  {
    id: 9,
    path: "/products",
    showNav: true,
    element: <Product />,
  },
  {
    id: 10,
    path: "/products/:id",
    showNav: false,
    element: <SingleProduct />,
  },
  {
    id: 11,
    path: "/user/verify-email",
    showNav: false,
    element: <VerifyEmail />,
  },
  {
    id: 12,
    path: "/auth/forgot-password",
    showNav: false,
    element: <ForgotPwd />,
  },
  {
    id: 13,
    path: "/user/reset-password",
    showNav: false,
    element: <ResetPwd />,
  },
  {
    id: 18,
    path: "*",
    showNav: false,
    element: <NotFound />,
  },
];
