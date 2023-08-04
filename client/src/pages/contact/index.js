// Hooks
import useTitle from "../../hooks/useTitle";
// Component
import { WaveHandIcon } from "../../assets/icons/icon";

const Contact = () => {
  useTitle("Contact Us");

  return (
    <section id='contact' className='container'>
      <h2 className='text-md sm:text-2xl font-semibold'>
        <span className='first-letter:uppercase block'>
          love to hear from you,
        </span>
        <span className='flex justify-start items-center'>
          <span className='first-letter:uppercase'>get in touch</span>
          <span>
            <WaveHandIcon className='w-10 h-10' />
          </span>
        </span>
      </h2>
    </section>
  );
};
export default Contact;
