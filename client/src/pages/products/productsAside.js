import "./products.css";
import { useState } from "react";
// Component
import { CloseIcon, GridIcon, ListIcon } from "../../assets/icons/icon";
// Redux
import { useDispatch } from "react-redux";
import { gridView, listView, reset } from "../../features/product/productSlice";

const ProductAside = ({
  isFilterOpen,
  setIsFilterOpen,
  isList,
  enumProducts,
  filterOpt,
  setFilterOpt,
}) => {
  const dispatch = useDispatch();
  const [categoryValue, setCategoryValue] = useState(1);
  const [colorValue, setColorValue] = useState(0);
  const [searchText, setSearchText] = useState("");

  return (
    <aside
      className={` ${
        isFilterOpen
          ? "left-0 top-14 bottom-0 px-4 bg-tomato z-30 overflow-hidden text-white w-3/5"
          : "-left-full"
      }`}
    >
      <div className='cancel'>
        <button onClick={() => setIsFilterOpen(false)}>
          <CloseIcon className='w-6 h-6' />
        </button>
      </div>
      <div className='search'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilterOpt({
              ...filterOpt,
              text: searchText.toLowerCase(),
            });
          }}
        >
          <input
            type='search'
            placeholder='Search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </div>
      <div className='display flex justify-start items-center gap-2'>
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

      <div className='category'>
        <h3>category</h3>
        <ul className='capitalize'>
          {enumProducts.categories.map((item) => (
            <li key={item.id}>
              <button
                onClick={(e) => {
                  setFilterOpt({ ...filterOpt, category: item.category });
                  setCategoryValue(item.id);
                }}
                className={`${
                  item.id === categoryValue
                    ? "underline font-bold underline-offset-1 decoration-2"
                    : "hover:underline decoration-primary"
                }`}
              >
                {item.category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='store'>
        <h3>store</h3>
        <select
          defaultValue={filterOpt.store}
          onChange={(e) =>
            setFilterOpt({ ...filterOpt, store: e.target.value })
          }
        >
          <option>all</option>
          <option>ayeti-adorn</option>
          <option>jum's crotchet</option>
          <option>umar's kaftan</option>
        </select>
      </div>

      <div className='color'>
        <h3>colors</h3>
        <ul className='px-2 flex flex-wrap justify-start gap-1 items-center w-full overflow-hidden'>
          {enumProducts.colors.map((color, index) => (
            <li key={index} className='mt-2'>
              <button
                onClick={() => {
                  setColorValue(index);
                  setFilterOpt({ ...filterOpt, color });
                }}
                style={{ backgroundColor: color }}
                className={`w-5 h-5 bg-black border shadow-sm rounded-full hover:w-6 hover:h-6 ease-in-out duration-100 ${
                  index === colorValue ? "ring-2 ring-offset-2 ring-black" : ""
                } `}
              ></button>
            </li>
          ))}
        </ul>
      </div>

      <div className='price'>
        <h3>price</h3>
        <h4 className='font-semibold'>
          <span>${filterOpt.price}</span>
        </h4>
        <input
          type='range'
          min='0'
          max='100'
          className='w-full'
          onChange={(e) =>
            setFilterOpt({
              ...filterOpt,
              price: (e.target.value / 100) * enumProducts.maxPrice,
            })
          }
        />
      </div>

      <div className='free-shipping'>
        <h3 className=''>free shipping :</h3>
        <input
          onChange={(e) =>
            setFilterOpt({
              ...filterOpt,
              shipping: e.target.checked,
            })
          }
          type='checkbox'
          className='w-5 h-5'
        />
      </div>

      <div className='clear'>
        <button
          onClick={() => {
            setFilterOpt({
              text: "",
              category: "all",
              store: "all",
              color: [],
              price: enumProducts.maxPrice,
              sort: "",
              shipping: false,
            });
            setCategoryValue(1);
            setColorValue(0);

            setTimeout(() => dispatch(reset()), 500);
          }}
        >
          reset filters
        </button>
      </div>
    </aside>
  );
};

export default ProductAside;
