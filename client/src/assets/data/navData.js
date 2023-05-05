import Home from "../../pages/home";
import Store from "../../pages/stores";
import Search from "../../pages/search";
import Auth from "../../pages/auth";

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
    id: 10,
    path: "*",
    element: <NotFound />,
  },
];
