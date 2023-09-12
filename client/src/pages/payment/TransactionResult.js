import "./payment.css";
//Images
import done from "../../assets/images/done.png";
import failed from "../../assets/images/failed.svg";
// Redux
import { useSelector } from "react-redux";
// Icon
import { Confetti, ErrorIcon } from "../../assets/icons/icon";

const Transaction = ({ type }) => {
  const { user } = useSelector((store) => store.user);
  return (
    <section className='transaction container grid place-items-center h-[80vh] bg-no-repeat bg-left-top'>
      <img
        src={type === "error" ? failed : done}
        alt='Done'
        className='h-96 object-contain'
      />
      <h2 className='text-base md:text-xl font-medium leading-10 flex flex-col-reverse sm:flex-row justify-center items-center gap-2'>
        <span>
          Hey {user?.name || ""},
          {type === "error" ? " we could not complete" : " thank you for"} your
          purchase.
        </span>
        {type === "error" ? (
          <ErrorIcon className='w-10 h-10' />
        ) : (
          <Confetti className='w-10 h-10' />
        )}
      </h2>
      <p className='sm:text-base font-bold first-letter:text-xs sm:first-letter:text-normal '>
        <sup>&copy;</sup> AYETI-ADORN
      </p>
    </section>
  );
};

export default Transaction;
