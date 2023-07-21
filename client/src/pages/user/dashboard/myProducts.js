import "./dashboard.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Redux
// import { useSelector } from "react-redux";
// Hooks
import useFetch from "../../../hooks/useFetch";

// Component
import Loader1 from "../../../component/loaders/loader1";
import { ProductCard1 } from "../../products/productCard";
import Error1 from "../../../component/loaders/error";
import { Step1, Step2, Step3, Step4 } from "./steps";
import {
  ChevronLeft,
  ChevronRight,
  CloseIcon,
} from "../../../assets/icons/icon";

// Utils
import url from "../../../utils/url";

const MyProducts = ({ user }) => {
  const { data, pending, error } = useFetch(
    url + "/api/v1/products/my-products"
  );

  const [product, setProduct] = useState({
    open: false,
    step: 1,
    name: "",
    price: 0,
    image: "",
    desc: "",
    category: "unisex",
    color: ["#000"],
    inventory: 1,
    freeShipping: false,
  });
  if (user.role === "user") {
    return <Navigate to='/' />;
  }

  if (pending) {
    return <Loader1 />;
  }

  if (error || !data.products) {
    return <Error1 />;
  }
  const { products, count } = data;

  return (
    <section id='my-products'>
      {product.open && <AddProduct product={product} setProduct={setProduct} />}
      <header className='flex justify-between items-center mb-5 sm:mb-10'>
        <h3 className='italic capitalize sm:text-lg'>
          no. of products --- {count}
        </h3>

        <button
          className='bg-blue-500 py-2 px-3 text-white sm:text-base rounded-md'
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
          <div className='text-xl capitalize italic w-full text-center'>
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

const AddProduct = ({ product, setProduct }) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step > 3) {
      setStep(0);
    }
    if (step < 0) {
      setStep(3);
    }
  }, [step]);
  return (
    <main
      id='add-product'
      className='z-20 fixed overflow-hidden top-0 bottom-0 left-0 right-0 bg-black/30 flex justify-center items-center'
    >
      <div className='bg-white h-5/6 w-full mx-2 sm:w-4/5 rounded-lg shadow-md relative'>
        <div className='title flex justify-between items-center py-5 mx-10'>
          <h1 className='text-lg font-semibold capitalize text-center basis-3/4'>
            add a product
          </h1>
          <button onClick={() => setProduct({ ...product, open: false })}>
            <CloseIcon />
          </button>
        </div>

        <div className='container relative overflow-y-scroll'>
          {step === 0 && <Step1 product={product} setProduct={setProduct} />}
          {step === 1 && <Step2 product={product} setProduct={setProduct} />}
          {step === 2 && <Step3 product={product} setProduct={setProduct} />}
          {step === 3 && <Step4 product={product} setProduct={setProduct} />}
        </div>

        <footer className='absolute left-0 bottom-6 w-full gap-3 flex justify-end items-center pt-2 border-0 border-t-2'>
          <div className='step text-base'>Step {step + 1}</div>
          <div className='flex justify-between gap-4 items-center mr-3'>
            <button
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
              className='bg-primary p-3 rounded-full disabled:bg-transparent'
            >
              <ChevronLeft />
            </button>
            <button
              disabled={step === 3}
              onClick={() => setStep(step + 1)}
              className='bg-primary p-3 rounded-full disabled:bg-transparent'
            >
              <ChevronRight />
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
};
