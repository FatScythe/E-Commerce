import "./singleProduct.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Redux
import { fetchSingleProduct } from "../../../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
// Toastify
import { toast } from "react-toastify";
// Hooks
import useFetch from "../../../hooks/useFetch";
import url from "../../../utils/url";
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
  });
  let { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const { data, pending, error } = useFetch(url + "/api/v1/reviews");
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(url + "/api/v1/reviews/" + reviewId, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.msg);
        return;
      }

      toast.success(data.msg);
      dispatch(fetchSingleProduct({ id, user }));
    } catch (error) {
      console.error(error);
    }
  };

  if (pending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong : )</div>;
  }

  const { count, reviews } = data;
  return (
    <div className='reviews-container mt-5'>
      <h2 className='text-base capitalize font-semibold'>reviews ({count})</h2>
      {reviews.length > 0 ? (
        <div className='reviews mt-6 h-60 overflow-y-scroll'>
          {reviews.map((review) => {
            return (
              <div
                className='bg-slate-50 pl-2 p-1 border-0 border-l-4 border-secondary'
                key={review._id}
              >
                <div>
                  <div className='flex gap-1 mb-2 items-center'>
                    <img
                      className='h-12 w-12 rounded-full object-cover border border-red-300'
                      src={review.user.avatar}
                      alt=''
                    />

                    <div className='flex justify-between items-center w-full'>
                      <h3 className='capitalize'>
                        <span className='font-semibold'>
                          {review.user.name}
                        </span>
                        <StarRated rating={review.rating} />
                      </h3>

                      {review.user._id === user._id ? (
                        <div className='flex justify-between gap-2 items-center'>
                          <button className='bg-secondary p-2 rounded-full'>
                            <EditIcon />
                          </button>
                          <button
                            className='bg-tomato p-2 rounded-full'
                            onClick={() => handleDeleteReview(review._id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      ) : (
                        <div></div>
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
          onClick={() => setReview({ ...review, isOpen: !review.isOpen })}
        >
          add a review
        </button>
      </div>

      <AddReviewForm review={review} setReview={setReview} id={id} />
    </div>
  );
};

export default Review;

const AddReviewForm = ({ review, setReview, id }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddReview = async (e, review) => {
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

    try {
      const response = await fetch(url + "/api/v1/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ product: id, title, comment, rating }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg);
        return;
      }
      toast.success("Review has been added");
      dispatch(fetchSingleProduct({ id, user }));
    } catch (error) {
      console.error(error);
    }
  };
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
            onClick={(e) => handleAddReview(e, review)}
          >
            submit
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
