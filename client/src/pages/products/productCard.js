import "./products.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Component
import { ArrowUpRight } from "../../assets/icons/icon";
import StarRated from "../../component/star";
import Loader1 from "../../component/loaders/loader1";
import Error1 from "../../component/loaders/error";
// Utils
import convertCurrency from "../../utils/convertCurrency";

const ProductCard = () => {
  const { isList, filteredProducts, product_loading, products } = useSelector(
    (store) => store.product
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = products ? filteredProducts.length : 0;
  const productPerPage = 9;
  const pages = Math.ceil(totalProducts / productPerPage);

  const handlePrev = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPage);
  };

  const handleNext = () => {
    const nextPage = Math.min(currentPage + 1, pages);
    setCurrentPage(nextPage);
  };

  const start = productPerPage * (currentPage - 1);
  const end = productPerPage * currentPage;

  if (product_loading) {
    return <Loader1 />;
  }

  if (!products) {
    return <Error1 />;
  }

  if (!filteredProducts.length > 0) {
    return <div>No items matched your search</div>;
  }

  return (
    <>
      <div className='flex justify-between items-center my-2 sm:my-1'>
        <button
          disabled={currentPage === 1}
          className='bg-blue-500 px-2 py-1 text-white rounded-md disabled:bg-gray-400'
          onClick={handlePrev}
        >
          prev
        </button>
        <span className='font-semibold'>
          {currentPage} /{pages}
        </span>
        <button
          className='bg-blue-500 px-2 py-1 text-white rounded-md disabled:bg-gray-400'
          disabled={currentPage === pages}
          onClick={handleNext}
        >
          next
        </button>
      </div>
      <div className='products-container md:mt-5 grid grid-cols-12 gap-6'>
        {!isList &&
          filteredProducts
            .slice(start, end)
            .map((item) => <ProductCard1 key={item._id} {...item} />)}
        {isList &&
          filteredProducts
            .slice(start, end)
            .map((item) => <ProductCard2 key={item._id} {...item} />)}
      </div>
    </>
  );
};

export default ProductCard;

export const ProductCard1 = ({
  id,
  name,
  image,
  price,
  averageRating,
  numOfReviews,
}) => {
  const { dark } = useSelector((store) => store.ui);
  const { amount, currency } = convertCurrency(price);
  return (
    <div
      className={`product-card1 h-fit ${
        dark ? "bg-primary text-white" : "bg-transparent"
      } col-span-12 sm:col-span-6 md:col-span-4`}
    >
      <header className='relative'>
        <div className='overlay flex gap-2 justify-center items-center text-black italic'>
          <Link
            to={`/products/` + id}
            className='capitalize border border-black rounded-3xl my-2 px-3 py-2 flex'
          >
            <span>{name}</span>
            <ArrowUpRight />
          </Link>
        </div>
        <img
          src={image}
          alt='product'
          className='w-full h-96 object-cover'
          draggable={false}
        />
      </header>
      <footer className='capitalize font-semibold'>
        <div className='flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center'>
          <p>{name}</p>
          <span>
            {currency} {amount}
          </span>
        </div>
        <StarRated rating={averageRating} />
        <p>({numOfReviews})</p>
      </footer>
    </div>
  );
};

const ProductCard2 = ({
  id,
  name,
  image,
  price,
  desc,
  averageRating,
  numOfReviews,
}) => {
  const { amount, currency } = convertCurrency(price);
  return (
    <div className='product-card2 flex flex-col md:flex-row gap-4 justify-between items-center col-span-12'>
      <header className='md:basis-1/2 border'>
        <img
          src={image}
          className='w-3/4 md:w-full h-80 object-cover'
          alt='product'
          draggable={false}
        />
      </header>
      <footer className='md:basis-1/2'>
        <h3 className='capitalize font-bold mt-2 text-base'>{name}</h3>
        <p className='font-semibold mt-2'>
          {currency} {amount}
        </p>
        <p className='mt-2'>{desc}</p>

        <div className='flex justify-start items-center gap-2'>
          <StarRated rating={averageRating} />
          <span>[{numOfReviews}]</span>
        </div>

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
