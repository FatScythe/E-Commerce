import { ArrowUpLeft } from "../../assets/icons/icon";
import sampleImage from "../../assets/images/img.png";

const SearchResult = () => {
  return (
    <section className='search-result'>
      <div className='result-items'>
        <div className='result-item'>
          <div className='title'>
            <img src={sampleImage} alt='product/store' />
            <h2 className='capitalize'>
              crotchet hat Lorem ipsum dolor sit amet.
            </h2>
          </div>
          <ArrowUpLeft />
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
