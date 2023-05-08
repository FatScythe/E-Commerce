import useTitle from "../../hooks/useTitle";

const Product = () => {
  useTitle("Products");
  return (
    <section id='products' className='container'>
      Products
    </section>
  );
};

export default Product;
