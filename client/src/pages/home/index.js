import "./home.css";
// Hooks
import useTitle from "../../hooks/useTitle";
// Component
import Carousel from "./carousel";
import Slider from "../../component/slider/slider";
import { useSelector } from "react-redux";

const HomePage = () => {
  useTitle("Home || Ayeti Adorn");
  const { products, product_loading } = useSelector((store) => store.product);
  return (
    <section id='home' className='relative'>
      <Carousel />
      <main className='mt-6'>
        {product_loading ? (
          <div>Loading...</div>
        ) : (
          <Slider
            title='now on sale'
            array={products.filter((product) => product.featured)}
          />
        )}
      </main>
    </section>
  );
};

export default HomePage;
