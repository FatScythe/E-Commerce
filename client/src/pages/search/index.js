import "./search.css";
import { useEffect, useState } from "react";
// Component
import { CloseIcon } from "../../assets/icons/icon";
import NotNav from "../../component/noNavHeader/wannabeNav";
import SearchResult from "./searchResult";
import SearchInput from "./searchInput";
import Recent from "./recentSearch";
// Redux
import { showNav } from "../../features.js/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  showModal,
  closeModal,
  clearSearchHistory,
} from "../../features.js/ui/uiSlice";
import useTitle from "../../hooks/useTitle";

const Search = () => {
  useTitle("Search");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showNav(false));
  }, [dispatch]);

  const question = "clear all recent searches?";
  const positiveFn = () => {
    dispatch(clearSearchHistory());
    dispatch(closeModal());
  };
  const negativeFn = () => {
    console.log("Home negative fn");
    dispatch(closeModal());
  };

  const [searchText, setSearchText] = useState("");

  const { search } = useSelector((state) => state.ui);

  return (
    <section id='search' className='container'>
      <NotNav />
      <main className='relative'>
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
        {searchText && <SearchResult />}
        {search.searchHistory.length === 0 && (
          <p className='no-recent'>try searching for products in stores</p>
        )}
        {search.searchHistory.length > 0 && (
          <div className='recent'>
            <div className='recent-header'>
              <h2>recent</h2>
              <button
                onClick={() => {
                  dispatch(
                    showModal({ open: true, question, positiveFn, negativeFn })
                  );
                }}
              >
                <CloseIcon />
              </button>
            </div>

            <div className='recent-items'>
              {search.searchHistory.map((item, index) => {
                return <Recent item={item} key={index} />;
              })}
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

export default Search;
