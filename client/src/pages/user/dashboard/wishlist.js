// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/product/productSlice";
// Component
import { ProductCard1 } from "../../products/productCard";
// Toastify
import { toast } from "react-toastify";
// url
import url from "../../../utils/url";

const WishList = ({ user }) => {
  const { product_loading, products } = useSelector((store) => store.product);
  const { dark } = useSelector((store) => store.ui);
  const dispatch = useDispatch();

  if (product_loading) {
    return <div className='mt-20 animate-pulse'>Loading...</div>;
  }

  const wishList = products.filter((product) => {
    return product.likedBy.includes(user._id);
  });

  if (!wishList.length > 0) {
    return (
      <div
        className={`${
          dark ? "text-white" : "text-black"
        } text-xl capitalize italic text-center mt-20`}
      >
        you have no item in your wishlist
      </div>
    );
  }

  const handleRemove = async (id) => {
    try {
      const response = await fetch(url + "/api/v1/products/like/" + id, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg);
        return;
      }
      dispatch(fetchProducts());
      toast.success(data.msg);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id='wishlist'>
      <h2
        className={`capitalize font-semibold text-xl sm:text-2xl mb-10 ${
          dark ? "text-white" : "text-black"
        }`}
      >
        wishlist
      </h2>
      <div className='wrapper md:mt-5 grid grid-cols-12 gap-8'>
        {wishList.map((product) => (
          <Card
            key={product._id}
            product={product}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </section>
  );
};

const Card = ({ product, handleRemove }) => {
  return (
    <div className='col-span-12 sm:col-span-6 lg:col-span-4'>
      <ProductCard1 {...product} />
      <button
        className='block my-5 bg-tomato text-white border-2 hover:border-tomato hover:bg-transparent hover:text-black rounded-3xl w-full p-4  transition-all duration-500 ease-in-out'
        onClick={() => handleRemove(product._id)}
      >
        remove from wishlist
      </button>
    </div>
  );
};

export default WishList;
