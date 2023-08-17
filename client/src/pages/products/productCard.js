import "./products.css";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Component
import { ArrowUpRight } from "../../assets/icons/icon";
import StarRated from "../../component/star";
import Loader1 from "../../component/loaders/loader1";
import Error1 from "../../component/loaders/error";

// Images
import img from "../../assets/images/img.png";

const ProductCard = () => {
  const { isList, filteredProducts, product_loading, products } = useSelector(
    (store) => store.product
  );

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
  return (
    <div
      className={`product-card1 ${
        dark ? "bg-primary text-white" : "bg-transparent"
      } col-span-12 sm:col-span-6 md:col-span-4`}
    >
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
          src={image}
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
        <p>({numOfReviews})</p>
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
