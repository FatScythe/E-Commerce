import "./singleProduct.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Redux
import { fetchReviews, reviewCrud } from "../../../features/review/reviewSlice";
import { useSelector, useDispatch } from "react-redux";
// Toastify
import { toast } from "react-toastify";

// Component
import StarRated from "../../../component/star";
import { EditIcon, TrashIcon } from "../../../assets/icons/icon";

const Review = () => {
  const { id } = useParams();
  const [review, setReview] = useState({
    title: "",
    comment: "",
    rating: 0,
    isOpen: false,
    type: "add",
    reviewId: "",
    productId: id,
  });
  let { user } = useSelector((store) => store.user);
  let { allReviews, reviews_status } = useSelector((store) => store.review);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleDeleteReview = async (reviewId) => {
    dispatch(reviewCrud({ ...review, reviewId, type: "delete" }));
    setTimeout(() => {
      dispatch(fetchReviews());
    }, 3000);
  };

  const handleReview = async (e, review) => {
    e.preventDefault();

    const { title, comment, rating } = review;
    if (!user) {
      toast.error("Please Login");
      navigate("/auth");
      return;
    }
    if (!title || !comment || !rating) {
      toast.error("Please fill all field");
      return;
    }

    dispatch(reviewCrud(review));
    setReview({ ...review, isOpen: false, type: "add" });

    setTimeout(() => {
      dispatch(fetchReviews());
    }, 3000);
  };

  const handleEditReview = (payload) => {
    const { title, comment, rating, _id } = payload;
    setReview({
      ...review,
      title,
      comment,
      rating,
      isOpen: true,
      reviewId: _id,
      type: "edit",
    });
  };

  if (reviews_status === "pending") {
    return <div>Loading...</div>;
  }

  if (reviews_status === "err") {
    return <div>Something went wrong : )</div>;
  }

  const { reviews } = allReviews;

  const productReview = reviews.filter((review) => review.product._id === id);

  return (
    <div className='reviews-container my-5'>
      <h2 className='text-base capitalize font-semibold'>
        reviews ({productReview.length})
      </h2>
      {productReview.length > 0 ? (
        <div className='reviews mt-6 h-80 overflow-y-scroll'>
          {productReview.map((review) => {
            return (
              <div
                className='bg-slate-50 pl-2 p-1 border-0 border-l-4 border-secondary mb-4'
                key={review._id}
              >
                <div>
                  <div className='flex gap-1 mb-2 items-center'>
                    <img
                      className='h-12 w-12 rounded-full object-cover border border-red-300'
                      src={review.user.avatar}
                      alt={review.user.name}
                    />
                    <div className='flex justify-between items-center w-full'>
                      <h3 className='capitalize'>
                        <span className='font-semibold'>
                          {review.user.name}
                        </span>
                        <StarRated rating={review.rating} />
                      </h3>

                      {user && (
                        <EditDeleteReview
                          review={review}
                          user={user}
                          handleEditReview={handleEditReview}
                          handleDeleteReview={handleDeleteReview}
                        />
                      )}
                    </div>
                  </div>

                  <h3 className=' font-bold text-base'>{review.title}</h3>
                  <p className='bg-slate-200 mb-3 rounded-md p-2 text-ellipsis'>
                    {review.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='text-center text-lg italic'>No Reviews Yet!</div>
      )}

      <div className='w-full mt-3 flex justify-center items-center'>
        <button
          className='bg-black text-white hover:bg-tomato px-3 py-2 rounded-3xl'
          onClick={() =>
            setReview({
              ...review,
              title: "",
              comment: "",
              rating: 0,
              type: "add",
              isOpen: !review.isOpen,
            })
          }
        >
          add a review
        </button>
      </div>

      <AddReviewForm
        review={review}
        setReview={setReview}
        handleReview={handleReview}
      />
    </div>
  );
};

export default Review;

const EditDeleteReview = ({
  review,
  user,
  handleEditReview,
  handleDeleteReview,
}) => {
  if (user.role === "admin") {
    return (
      <div className='flex justify-between gap-2 items-center'>
        <button
          className='bg-secondary p-2 rounded-full'
          onClick={() => handleEditReview(review)}
        >
          <EditIcon />
        </button>
        <button
          className='bg-tomato p-2 rounded-full'
          onClick={() => handleDeleteReview(review._id)}
        >
          <TrashIcon />
        </button>
      </div>
    );
  }
  if (user.userId === review.user._id)
    return (
      <div className='flex justify-between gap-2 items-center'>
        <button
          className='bg-secondary p-2 rounded-full'
          onClick={() => handleEditReview(review)}
        >
          <EditIcon />
        </button>
        <button
          className='bg-tomato p-2 rounded-full'
          onClick={() => handleDeleteReview(review._id)}
        >
          <TrashIcon />
        </button>
      </div>
    );
};

const AddReviewForm = ({ review, setReview, handleReview }) => {
  return (
    <div
      className={`add-review w-full sm:w-2/4 mx-auto ${
        review.isOpen ? "max-h-[32rem]" : "max-h-0"
      } overflow-hidden transition-all duration-1000`}
    >
      <div className='rating mt-3 bg-gray-300 py-3 flex justify-center items-center gap-4 capitalize'>
        <p>your rating*</p>
        <Rating review={review} setReview={setReview} />
      </div>

      <form className='capitalize'>
        <div className='mt-3 flex flex-col justify-between items-start'>
          <label htmlFor='title' className='font-semibold text-base'>
            title
          </label>
          <input
            type='text'
            value={review.title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            placeholder='Add review title *'
            className='w-full outline-none border border-black p-2 placeholder:pl-2'
          />
        </div>

        <div className='mt-3 flex flex-col justify-between items-start'>
          <label htmlFor='comment' className='font-semibold text-base'>
            comment
          </label>
          <textarea
            name='comment'
            id='comment'
            cols='30'
            rows='10'
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            placeholder='Add review *'
            className='w-full outline-none border border-black p-2 placeholder:pl-2 resize-none'
          ></textarea>
        </div>

        <div className='mt-3 flex justify-end items-center'>
          <button
            className='w-fit bg-black text-white px-3 py-2 hover:opacity-70 hover:scale-95'
            onClick={(e) => handleReview(e, review)}
          >
            {review.type === "add" ? "submit" : "update"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Rating = ({ review, setReview }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className='rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            key={index}
            onMouseEnter={() => setHover(index)}
            onMouseDown={() => setHover(review.rating)}
            onClick={() => setReview({ ...review, rating: index })}
          >
            <span
              className={`${
                index <= (review.rating || hover) ? "text-tomato" : "text-white"
              } text-lg mr-2`}
            >
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
};
