import { useEffect } from "react";
import { showNav } from "../features.js/ui/uiSlice";
import { useDispatch } from "react-redux";
const useShowNav = (bool) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showNav(bool));
  });
  return;
};

export default useShowNav;
