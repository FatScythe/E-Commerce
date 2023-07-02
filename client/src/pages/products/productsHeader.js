import "./products.css";
// Component
import { FilterIcon, GridIcon, ListIcon } from "../../assets/icons/icon";
// Redux
import { useDispatch } from "react-redux";
import { gridView, listView } from "../../features/product/productSlice";

const ProductMainHeader = ({
  isFilterOpen,
  setIsFilterOpen,
  isList,
  filterOpt,
  setFilterOpt,
}) => {
  const dispatch = useDispatch();
  return (
    <header>
      <div className='togglers'>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className='sm:hidden flex gap-3 font-bold border border-gray-800 hover:font-semibold hover:text-white hover:bg-yellowish hover:border-yellowish p-2 rounded-3xl'
        >
          <FilterIcon /> <h3>filters</h3>
        </button>
        <div className='display flex justify-between items-center gap-3'>
          <button
            onClick={() => dispatch(gridView())}
            className={`${!isList ? "active" : ""}`}
          >
            <GridIcon />
          </button>
          <button
            onClick={() => dispatch(listView())}
            className={`${isList ? "active" : ""}`}
          >
            <ListIcon />
          </button>
        </div>
        <h3 className='number'> 30 products found</h3>
      </div>

      <div className='line w-full md:w-1/2'></div>

      <div className='sort flex items-center gap-2 capitalize'>
        <span>sort by:</span>
        <select
          defaultValue={filterOpt.sort}
          onChange={(e) => setFilterOpt({ ...filterOpt, sort: e.target.value })}
          className='border border-black outline-none'
        >
          <option defaultValue={"none"}>none</option>
          <option>name (a-z)</option>
          <option>name (z-a)</option>
          <option>price (lowest)</option>
          <option>price (highest)</option>
        </select>
      </div>
    </header>
  );
};

export default ProductMainHeader;
