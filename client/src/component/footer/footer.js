import "./footer.css";
import Accordian from "./accordian/accordian";
import { accordianData } from "../../assets/data/accordianData";

const Footer = () => {
  return (
    <footer id='footer' className='container'>
      <h1>ayeti adorn</h1>
      <div className='accordian-container'>
        {accordianData.map((accordian) => {
          return <Accordian key={accordian.id} {...accordian} />;
        })}
      </div>

      <div className='legal'>
        <div>site</div>
        <div>legal & privacy</div>
        <div>cookies</div>
      </div>

      <div></div>
    </footer>
  );
};

export default Footer;
