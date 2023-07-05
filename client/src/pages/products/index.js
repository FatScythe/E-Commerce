import "./products.css";
import { useEffect, useState } from "react";

// Hooks
import useTitle from "../../hooks/useTitle";
// Component
import ProductAside from "./productsAside";
import ProductMainHeader from "./productsHeader";
import ProductCard from "./productCard";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { sort } from "../../features/product/productSlice";

const Product = () => {
  useTitle("Products");
  const dispatch = useDispatch();

  const { isList, enumProducts, filteredProducts } = useSelector(
    (store) => store.product
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOpt, setFilterOpt] = useState({
    text: "",
    category: "all",
    store: "all",
    color: "",
    price: enumProducts.maxPrice,
    sort: "none",
    shipping: false,
  });

  useEffect(() => {
    dispatch(sort(filterOpt));
  }, [filterOpt, dispatch]);

  return (
    <section id='products' className='container'>
      <ProductAside
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        isList={isList}
        enumProducts={enumProducts}
        filterOpt={filterOpt}
        setFilterOpt={setFilterOpt}
      />
      <main className='col-span-12 sm:col-span-9 overflow-y-scroll overflow-x-hidden'>
        <ProductMainHeader
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          isList={isList}
          filterOpt={filterOpt}
          setFilterOpt={setFilterOpt}
          count={filteredProducts.length}
        />

        <ProductCard />
      </main>
    </section>
  );
};

export default Product;
