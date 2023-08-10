import "../dashboard/dashboard.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { crudProducts } from "../../../features/product/productSlice";
import { showModal, closeModal } from "../../../features/ui/uiSlice";
// Hooks
import useFetch from "../../../hooks/useFetch";

// Component
import Loader1 from "../../../component/loaders/loader1";
import { ProductCard1 } from "../../products/productCard";
import Error1 from "../../../component/loaders/error";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { CloseIcon } from "../../../assets/icons/icon";

// Utils
import url from "../../../utils/url";

// Toastify
import { toast } from "react-toastify";

const MyProducts = ({ user }) => {
  const { data, pending, error } = useFetch(
    url + user.role !== "admin"
      ? "/api/v1/products/my-products"
      : "/api/v1/products",
    5000
  );

  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    open: false,
    step: 0,
    name: "",
    price: 0,
    image: "/img.png",
    desc: "",
    category: "unisex",
    color: ["#000"],
    inventory: 1,
    freeShipping: false,
    type: "add",
    productId: "",
  });

  const handleProduct = () => {
    const { name, price, desc } = product;

    if (!name || !price || !desc) {
      toast.error("Please fill all field");
      return;
    }

    dispatch(crudProducts(product));
    setProduct({ ...product, open: false, type: "add", productId: "" });
  };

  const handleEditProduct = (productDetails) => {
    const {
      _id,
      name,
      price,
      image,
      desc,
      category,
      color,
      inventory,
      freeShipping,
    } = productDetails;

    setProduct({
      ...product,
      open: true,
      step: 2,
      name,
      price,
      image,
      desc,
      category,
      color,
      inventory,
      freeShipping,
      type: "edit",
      productId: _id,
    });
  };

  const handleDeleteProduct = (productId) => {
    dispatch(crudProducts({ ...product, productId, type: "delete" }));
  };

  if (user.role === "user") {
    return <Navigate to='/' />;
  }

  if (pending) {
    return <Loader1 />;
  }

  if (error || !data.products || data.products === undefined) {
    return <Error1 />;
  }
  const { products, count } = data;

  return (
    <section id='my-products'>
      <h2 className='capitalize font-semibold text-xl sm:text-2xl mb-10'>
        Product
      </h2>
      {product.open && (
        <AddProduct
          product={product}
          setProduct={setProduct}
          handleProduct={handleProduct}
        />
      )}
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
            <Card
              key={product._id}
              product={product}
              handleEditProduct={handleEditProduct}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))
        ) : (
          <div className='text-lg first-letter:uppercase italic col-span-12 text-center'>
            you have no products yet, click the add product to get started
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProducts;

const Card = ({ product, handleEditProduct, handleDeleteProduct }) => {
  const dispatch = useDispatch();
  const question = "Are you sure you want to delete product?";
  const positiveFn = () => {
    handleDeleteProduct(product._id);
    dispatch(closeModal());
  };
  const negativeFn = () => {
    dispatch(closeModal());
  };

  return (
    <div className='col-span-12 sm:col-span-6 lg:col-span-4'>
      <ProductCard1 {...product} />
      <button
        className='block my-5 bg-black text-white border-2 hover:border-black hover:bg-transparent hover:text-black rounded-3xl w-full p-4  transition-all duration-500 ease-in-out'
        onClick={() => handleEditProduct(product)}
      >
        edit product
      </button>
      <button
        className='block my-5 bg-tomato hover:bg-secondary hover:text-black text-white rounded-3xl w-full p-4  transition-all duration-500 ease-in-out'
        onClick={() =>
          dispatch(showModal({ open: true, question, positiveFn, negativeFn }))
        }
      >
        delete product
      </button>
    </div>
  );
};

const AddProduct = ({ product, setProduct, handleProduct }) => {
  useEffect(() => {
    if (product.step > 3) {
      setProduct({ ...product, step: 0 });
    }
    if (product.step < 0) {
      setProduct({ ...product, step: 3 });
    }
  }, [product, setProduct]);
  return (
    <main
      id='add-product'
      className='z-20 fixed overflow-hidden top-0 bottom-0 left-0 right-0 bg-black/30 flex justify-center items-center'
    >
      <div className='bg-white h-5/6 w-full mx-2 sm:w-4/5 rounded-lg shadow-md relative'>
        <div className='title flex justify-between items-center py-2 sm:py-5 mx-10'>
          <h1 className='text-lg font-semibold capitalize text-center basis-3/4'>
            add a product: step( {product.step + 1} / 3)
          </h1>
          <button onClick={() => setProduct({ ...product, open: false })}>
            <CloseIcon />
          </button>
        </div>

        <div className='container relative overflow-y-scroll h-5/6'>
          {product.step === 0 && (
            <Step1 product={product} setProduct={setProduct} />
          )}
          {product.step === 1 && (
            <Step2 product={product} setProduct={setProduct} />
          )}
          {product.step === 2 && (
            <Step3
              product={product}
              setProduct={setProduct}
              handleProduct={handleProduct}
            />
          )}
        </div>
      </div>
    </main>
  );
};
