import "./notfound.css";
// Hooks
import useTitle from "../../hooks/useTitle";

const NotFound = () => {
  useTitle("Page Not Found");
  return (
    <section id='not-found' className='container text-red-700 text-xl'>
      404? NOT FOUND!!!
    </section>
  );
};

export default NotFound;
