import "./products.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// Hooks
import useTitle from "../../hooks/useTitle";
import useShowNav from "../../hooks/useShowNav";

// Component
import {
  CloseIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  ArrowUpRight,
} from "../../assets/icons/icon";

// Images
import img from "../../assets/images/img.png";
import StarRated from "../../component/star";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { gridView, listView } from "../../features/product/productSlice";

const Product = () => {
  useTitle("Products");
  useShowNav();
  const { isList, filteredProducts, product_loading } = useSelector(
    (store) => store.product
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  console.log(filteredProducts.length);
  if (filteredProducts.length < 1) {
    return <div> sorry, no products matched your search.</div>;
  }

  if (product_loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id='products' className='container'>
      <ProductAside
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        isList={isList}
      />
      <main className='col-span-12 sm:col-span-9 overflow-y-scroll overflow-x-hidden'>
        <ProductMainHeader
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          isList={isList}
        />

        <div className='products-container md:mt-5 grid grid-cols-12 gap-6'>
          {!isList &&
            filteredProducts.map((item) => (
              <ProductCard1 key={item._id} {...item} />
            ))}
          {isList &&
            filteredProducts.map((item) => (
              <ProductCard2 key={item._id} {...item} />
            ))}
        </div>
      </main>
    </section>
  );
};

export default Product;

const ProductAside = ({ isFilterOpen, setIsFilterOpen, isList }) => {
  const dispatch = useDispatch();
  return (
    <aside
      className={`${
        isFilterOpen
          ? "left-0 top-14 bottom-0 px-4 bg-tomato z-30 overflow-hidden text-white w-3/5"
          : "-left-full"
      }`}
    >
      <div className='cancel'>
        <button onClick={() => setIsFilterOpen(false)}>
          <CloseIcon />
        </button>
      </div>
      <div className='search'>
        <input type='search' placeholder='Search' />
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
          <li>
            <button>all</button>
          </li>
          <li>
            <button>men</button>
          </li>
          <li>
            <button>women</button>
          </li>
          <li>
            <button>kids</button>
          </li>
          <li>
            <button>unisex</button>
          </li>
        </ul>
      </div>

      <div className='store'>
        <h3>store</h3>
        <select>
          <option defaultValue={"All"}>all</option>
          <option>ayeti adorn</option>
          <option>jum's crotchet</option>
          <option>umar's kaftan</option>
        </select>
      </div>

      <div className='color'>
        <h3>color</h3>
        <ul className='flex justify-start items-center'>
          <li>
            <button>all</button>
          </li>
          <li>
            <button>red</button>
          </li>
          <li>
            <button>blue</button>
          </li>
          <li>
            <button>green</button>
          </li>
        </ul>
      </div>

      <div className='price'>
        <h3>price</h3>
        <h4 className='flex justify-between items-center'>
          <span>$0</span>
          <span>$50000</span>
        </h4>
        <input
          type='range'
          min='0'
          max='100'
          className='w-full'
          onClick={(e) => console.log(e.target.value)}
        />
      </div>

      <div className='free-shipping'>
        <h3 className=''>free shipping :</h3>
        <input type='checkbox' className='w-5 h-5' />
      </div>

      <div className='clear'>
        <button>clear filters</button>
      </div>
    </aside>
  );
};

const ProductMainHeader = ({ isFilterOpen, setIsFilterOpen, isList }) => {
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
        <select className='border border-black capitalize outline-none'>
          <option>price (lowest)</option>
          <option>price (highest)</option>
          <option>name (a-z)</option>
          <option>name (z-a)</option>
        </select>
      </div>
    </header>
  );
};

export const ProductCard1 = ({
  id,
  name,
  image,
  price,
  averageRating,
  numOfReviews,
}) => {
  return (
    <div className='product-card1 col-span-12 sm:col-span-6 md:col-span-4'>
      <header className='relative'>
        <div className='overlay flex gap-2 justify-center items-center'>
          <Link
            to={`/products/` + id}
            className='capitalize border border-black rounded-3xl my-2 px-3 py-2 flex'
          >
            <span>{name}</span>
            <ArrowUpRight />
          </Link>
        </div>
        <img
          src={"http://localhost:5000" + image}
          alt='product'
          className='w-full h-96 object-cover'
          draggable={false}
        />
      </header>
      <footer className='capitalize font-semibold'>
        <div className='flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center'>
          <p>{name}</p>
          <span>${price}</span>
        </div>
        <StarRated rating={averageRating} />
      </footer>
    </div>
  );
};

const ProductCard2 = () => {
  return (
    <div className='product-card2 flex flex-col md:flex-row gap-4 justify-between items-center col-span-12'>
      <header className='md:basis-1/2 border'>
        <img
          src={img}
          className='w-3/4 md:w-full h-80 object-cover'
          alt='product'
          draggable={false}
        />
      </header>
      <footer className='md:basis-1/2'>
        <h3 className='capitalize font-bold mt-2 text-base'>Product Name</h3>
        <p className='font-semibold mt-2'>$ 50.00</p>
        <p className='mt-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          eligendi accusantium alias, eum dolores recusandae laborum quo
          expedita dolor repellendus?
        </p>

        <StarRated rating={3.2} />

        <div className='btns mt-2 flex justify-start items-center gap-2'>
          <Link
            to='/products/123'
            className='border border-black px-3 py-2 rounded-3xl hover:border-0 hover:bg-secondary'
          >
            details
          </Link>
          <button className='border border-black px-3 py-2 rounded-3xl hover:border-0 hover:bg-secondary'>
            store
          </button>
        </div>
      </footer>
    </div>
  );
};
