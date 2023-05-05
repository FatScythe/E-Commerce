import "./search.css";
// Redux
import { showNav } from "../../features.js/ui/uiSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showNav(false));
  }, [dispatch]);

  return (
    <div id='search'>
      <h1>SEARCH!!!</h1>
    </div>
  );
};

export default Search;
