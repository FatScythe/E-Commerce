import "./store.css";
// Hook
import useTitle from "../../hooks/useTitle";
const StorePage = () => {
  useTitle("Store");
  return (
    <section id='store' className='container'>
      <h1>STORES</h1>
    </section>
  );
};

export default StorePage;
