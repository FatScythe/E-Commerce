import { useState } from "react";
import { Link } from "react-router-dom";
import "./accordian.css";

const Accordian = ({ title, desc }) => {
  const [isAccOpen, setIsAccOpen] = useState(false);

  return (
    <div className='accordian' onClick={() => setIsAccOpen(!isAccOpen)}>
      <header>
        <h3>{title}</h3>
        <button className='font-bold'>{isAccOpen ? "-" : "+"}</button>
      </header>

      <article className={`${isAccOpen ? "max-h-40" : "max-h-0"}`}>
        <p>{desc}</p>
        {title === "help" && <HelpAccordian />}
        {title === "services" && <ServicesAccordian />}
        {title.startsWith("about") && <AboutAccordian />}
        {title === "contact" && <ContactAccordian />}
      </article>
    </div>
  );
};

export default Accordian;

const HelpAccordian = () => {
  return (
    <ul>
      <p>
        <li>
          you can <a href='tel:+23400000000'>call</a> and
          <a href='mailto:ayetiadorn@gmail.com'> email us</a>
        </li>
        <li className='uppercase'>
          <Link to='/contact'>FAQ's</Link>
        </li>
        <li>
          <Link to='/stores'>stores</Link>
        </li>
      </p>
    </ul>
  );
};

const ServicesAccordian = () => {
  return (
    <ul>
      <p>
        <li>
          <Link to='/contact'>refunds</Link>
        </li>
        <li className='uppercase'>
          <Link to='/contact'>personalizaton</Link>
        </li>
        <li>
          <Link to='/products'>art of gifting</Link>
        </li>
        <li>
          <Link to='/'>download our app</Link>
        </li>
      </p>
    </ul>
  );
};

const AboutAccordian = () => {
  return (
    <ul>
      <p>
        <li>
          <Link to='/about'>our ceo</Link>
        </li>
        <li>
          <Link to='/about'>sustainability</Link>
        </li>
        <li>
          <Link to='/about'>careers</Link>
        </li>
        <li>
          <Link to='/about'>latest news</Link>
        </li>
      </p>
    </ul>
  );
};

const ContactAccordian = () => {
  return (
    <ul>
      <p>
        <li>
          you can
          <a href='tel:+23400000000'> call</a> and
          <a href='mailto:ayetiadorn@gmail.com'> email us</a>
        </li>
      </p>
    </ul>
  );
};
