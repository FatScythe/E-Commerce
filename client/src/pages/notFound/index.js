import "./notfound.css";
// Hooks
import useTitle from "../../hooks/useTitle";
import useShowNav from "../../hooks/useShowNav";
const NotFound = () => {
  useTitle("Page Not Found");
  useShowNav();
  return (
    <section id='not-found' className='container text-red-700 text-xl'>
      404? NOT FOUND!!!
    </section>
  );
};

export default NotFound;
