// Component
import { SearchIcon } from "../../assets/icons/icon";
// Redux
import { addToSearchHistory } from "../../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchInput = ({
  searchText,
  setSearchText,
  setAllProducts,
  setAllStores,
}) => {
  const dispatch = useDispatch();
  const { products, product_loading } = useSelector((store) => store.product);

  const { stores, stores_status } = useSelector((store) => store.store);

  const handleSearch = (e) => {
    setSearchText(e.target.value);

    if (!product_loading && products !== undefined) {
      let filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setAllProducts(filteredProducts);
    }
    if (stores_status === "ok" && stores !== undefined) {
      let filteredStores = stores.stores.filter((store) =>
        store.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setAllStores(filteredStores);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='input-container'>
        <SearchIcon />
        <input
          type='search'
          value={searchText}
          onChange={handleSearch}
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
