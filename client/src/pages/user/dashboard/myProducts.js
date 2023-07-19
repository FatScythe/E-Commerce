import { useState } from "react";
import { Navigate } from "react-router-dom";

// Redux
// import { useSelector } from "react-redux";
// Hooks
import useFetch from "../../../hooks/useFetch";

// Component
import Loader1 from "../../../component/loaders/loader1";
import { ProductCard1 } from "../../products/productCard";

// Utils
import url from "../../../utils/url";
import Error1 from "../../../component/loaders/error";

const MyProducts = ({ user }) => {
  const { data, pending, error } = useFetch(
    url + "/api/v1/products/my-products"
  );

  const [product, setProduct] = useState({
    open: false,
    name: "",
    price: 0,
    image: "",
    desc: "",
    category: "",
    store: "",
    color: [],
    inventory: 0,
    freeShipping: false,
  });
  if (user.role === "user") {
    return <Navigate to='/' />;
  }

  if (pending) {
    return <Loader1 />;
  }

  if (error || !data) {
    return <Error1 />;
  }
  const { products, count } = data;

  return (
    <section id='my-products' className='relative'>
      {product.open && <AddProduct />}
      <header className='flex justify-between items-center mb-10'>
        <h3 className='italic capitalize text-lg'>
          no. of products --- {count}
        </h3>

        <button
          className='bg-blue-500 py-2 px-3 text-white text-base rounded-md'
          onClick={() => setProduct({ ...product, open: true })}
        >
          add product
        </button>
      </header>
      <div className='wrapper md:mt-5 grid grid-cols-12 gap-6'>
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product._id} product={product} />
          ))
        ) : (
          <div className='text-xl capitalize italic text-center'>
            you have no products yet, click the add product
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProducts;

const Card = ({ product }) => {
  return (
    <div className='col-span-12 sm:col-span-6 lg:col-span-4'>
      <ProductCard1 {...product} />
      <button className='block my-5 bg-black text-white border-2 hover:border-black hover:bg-transparent hover:text-black rounded-3xl w-full p-4  transition-all duration-500 ease-in-out'>
        edit product
      </button>
      <button className='block my-5 bg-tomato hover:bg-secondary hover:text-black text-white rounded-3xl w-full p-4  transition-all duration-500 ease-in-out'>
        delete product
      </button>
    </div>
  );
};

const AddProduct = () => {
  return (
    <main className='absolute left-1/2 right-1/2  -translate-x-1/2 -translate-y-1/2 h-5/6 w-10/12 bg-red-300 '>
      modal
    </main>
  );
};
