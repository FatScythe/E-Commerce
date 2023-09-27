// Icons
import { Star, StarEmpty, StarHalf } from "../../assets/icons/icon";
//Redux
import { useSelector } from "react-redux";

const StarRated = ({ rating }) => {
  const { dark } = useSelector((store) => store.ui);
  if (rating >= 0 && rating <= 0.5)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 0.5'>
        <StarHalf />
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
      </div>
    );
  if (rating > 0.5 && rating <= 1)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 1'>
        <Star />
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
      </div>
    );
  if (rating > 1 && rating <= 1.5)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 1.5'>
        <Star />
        <StarHalf />
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
      </div>
    );
  if (rating > 1.5 && rating <= 2)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 2'>
        <Star />
        <Star />
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
      </div>
    );
  if (rating > 2 && rating <= 2.5)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 2.5'>
        <Star />
        <Star />
        <StarHalf />
        <StarEmpty />
        <StarEmpty />
      </div>
    );
  if (rating > 2.5 && rating <= 3)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 3'>
        <Star />
        <Star />
        <Star />
        <StarEmpty />
        <StarEmpty />
      </div>
    );
  if (rating > 3 && rating <= 3.5)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 3.5'>
        <Star />
        <Star />
        <Star />
        <StarHalf />
        <StarEmpty />
      </div>
    );
  if (rating > 3.5 && rating <= 4)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 4'>
        <Star />
        <Star />
        <Star />
        <Star />
        <StarEmpty />
      </div>
    );
  if (rating > 4 && rating <= 4.5)
    return (
      <div className={`${dark && "fill-orange-300"}`} title='rating = 4.5'>
        <Star />
        <Star />
        <Star />
        <Star />
        <StarHalf />
      </div>
    );
  return (
    <div className={`${dark && "fill-orange-300"}`} title='rating = 5'>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
    </div>
  );
};

export default StarRated;
