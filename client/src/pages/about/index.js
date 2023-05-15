import "./about.css";
// Hooks
import useTitle from "../../hooks/useTitle";
import useShowNav from "../../hooks/useShowNav";

const About = () => {
  useShowNav();
  useTitle("About Ayeti Adorn");
  return (
    <section id='about' className='container'>
      <h3>About</h3>
    </section>
  );
};

export default About;
