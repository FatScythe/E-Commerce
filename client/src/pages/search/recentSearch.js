import { ArrowUpLeft } from "../../assets/icons/icon";
const Recent = ({ item }) => {
  return (
    <div className='recent-item'>
      <h2>{item}</h2>
      <ArrowUpLeft />
    </div>
  );
};

export default Recent;
