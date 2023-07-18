// Redux
import { useSelector } from "react-redux";

// Component
import { ProductCard1 } from "../../products/productCard";

const WishList = ({ user }) => {
  const { product_loading, products } = useSelector((store) => store.product);

  if (product_loading) {
    return <div>Loading...</div>;
  }

  const wishList = products.filter((product) => {
    return product.likedBy.includes(user._id);
  });

  if (!wishList.length > 0) {
    return <div>you have no item in your wishlist</div>;
  }

  console.log("wishlist here", wishList);
  return (
    <section id='wishlist'>
      <div className='wrapper md:mt-5 grid grid-cols-12 gap-6'>
        {wishList.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ product }) => {
  return (
    <div className='col-span-12 sm:col-span-6 lg:col-span-4'>
      <ProductCard1 {...product} />
      <button className='block my-5 bg-black text-white border-2 hover:border-black hover:bg-transparent hover:text-black rounded-3xl w-full p-4  transition-all duration-500 ease-in-out'>
        remove from wishlist
      </button>
      <button className='block my-5 bg-primary hover:bg-secondary hover:text-black text-white rounded-3xl w-full p-4  transition-all duration-500 ease-in-out'>
        add to cart
      </button>
    </div>
  );
};

export default WishList;
