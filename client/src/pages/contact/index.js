// Hooks
import useTitle from "../../hooks/useTitle";
import useShowNav from "../../hooks/useShowNav";

const Contact = () => {
  useTitle("Contact Us");
  useShowNav();

  return (
    <section id='contact' className='container'>
      <h3>Contact</h3>
    </section>
  );
};
export default Contact;
