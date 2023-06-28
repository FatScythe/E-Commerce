// Component
import { SearchIcon } from "../../assets/icons/icon";
// Redux
import { addToSearchHistory } from "../../features/ui/uiSlice";
import { useDispatch } from "react-redux";

const SearchInput = ({ searchText, setSearchText }) => {
  const dispatch = useDispatch();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='input-container'>
        <SearchIcon />
        <input
          type='search'
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(addToSearchHistory(searchText));
            }
          }}
          placeholder='Search for products, stores...'
        />
      </div>
    </form>
  );
};

export default SearchInput;
