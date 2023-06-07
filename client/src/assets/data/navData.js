import Home from "../../pages/home";
import Store from "../../pages/store";
import Search from "../../pages/search";
import Auth from "../../pages/auth";
import Cart from "../../pages/cart";
import User from "../../pages/user";
import About from "../../pages/about";
import Contact from "../../pages/contact";
import Product from "../../pages/products";
import SingleProduct from "../../pages/products/singleProduct/index.js";
import VerifyEmail from "../../pages/user/verify";

import NotFound from "../../pages/notFound";

export const navLinks = [
  {
    id: 1,
    path: "/",
    element: <Home />,
  },
  {
    id: 2,
    path: "/stores",
    element: <Store />,
  },
  {
    id: 3,
    path: "/search",
    element: <Search />,
  },
  {
    id: 4,
    path: "/auth",
    element: <Auth />,
  },
  {
    id: 5,
    path: "/about",
    element: <About />,
  },
  {
    id: 6,
    path: "/contact",
    element: <Contact />,
  },
  {
    id: 7,
    path: "/cart",
    element: <Cart />,
  },
  {
    id: 8,
    path: "/user",
    element: <User />,
  },
  {
    id: 9,
    path: "/products",
    element: <Product />,
  },
  {
    id: 10,
    path: "/products/:id",
    element: <SingleProduct />,
  },
  {
    id: 11,
    path: "/user/verify-email",
    element: <VerifyEmail />,
  },
  {
    id: 14,
    path: "*",
    element: <NotFound />,
  },
];
