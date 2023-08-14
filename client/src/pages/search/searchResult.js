import { Link } from "react-router-dom";
// Icon
import { ArrowUpLeft } from "../../assets/icons/icon";

const SearchResult = ({ allProducts, allStores }) => {
  return (
    <section className='search-result'>
      <div className='my-5'>
        <h2 className='text-base font-semibold'>Stores</h2>
        {allStores.length < 1 ? (
          <div className='italic font-semibold'> No stores available </div>
        ) : (
          <div className='w-full grid grid-cols-12 gap-4'>
            {allStores.map((store) => (
              <Link
                to={"/store/" + store._id}
                className='result-items col-span-6 sm:col-span-4 md:col-span-3'
                key={store._id}
              >
                <div>
                  <img
                    src={store.owner.avatar}
                    alt={store.name}
                    className='w-20 h-20 rounded-full object-cover'
                  />
                  <h1 className='italic'>{store.name}</h1>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className='text-base font-semibold'>Products</h2>
        {allProducts.length < 1 ? (
          <div className='italic font-semibold'> No products available </div>
        ) : (
          allProducts.map((product) => (
            <Link
              to={"/products/" + product._id}
              className='result-items'
              key={product._id}
            >
              <div className='result-item'>
                <div className='title'>
                  <img src={product.image} alt={product.name} />
                  <h2 className='capitalize'>{product.name}</h2>
                </div>
                <ArrowUpLeft />
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default SearchResult;
