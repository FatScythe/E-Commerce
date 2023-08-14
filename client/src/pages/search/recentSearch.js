import { ArrowUpLeft } from "../../assets/icons/icon";
const Recent = ({ item, setSearchText }) => {
  return (
    <button className='recent-item' onClick={() => setSearchText(item)}>
      <h2>{item}</h2>
      <ArrowUpLeft />
    </button>
  );
};

export default Recent;
