import { useSelector } from "react-redux";

const WishList = ({ user }) => {
  const { product_loading, products } = useSelector((store) => store.product);
  // console.log({ product_loading, products });

  // console.log(
  //   products[0].likedBy,
  //   user._id,
  //   products[0].likedBy.includes(user._id)
  // );

  const wishList = products.filter((product) => {
    return product.likedBy.includes(user._id);
  });

  console.log("wishlist here", wishList);
  return <div>My Wishlist</div>;
};

export default WishList;
