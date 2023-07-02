import "./home.css";
// Hooks
import useTitle from "../../hooks/useTitle";
// Component
import Carousel from "./carousel";
import Slider from "../../component/slider/slider";

const HomePage = () => {
  useTitle("Home || Ayeti Adorn");

  return (
    <section id='home' className='relative'>
      <Carousel />
      <main className='mt-6'>
        <Slider title='now on sale' />
      </main>
    </section>
  );
};

export default HomePage;
