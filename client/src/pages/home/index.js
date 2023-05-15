import "./home.css";
// Hooks
import useTitle from "../../hooks/useTitle";
import useShowNav from "../../hooks/useShowNav";
const HomePage = () => {
  useTitle("Home || Ayeti Adorn");
  useShowNav();

  return (
    <section id='home' className='container'>
      <h2>HOME</h2>
    </section>
  );
};

export default HomePage;
