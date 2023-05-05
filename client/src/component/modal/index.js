import "./modal.css";
import { CloseIcon } from "../../assets/icons/icon";
// Redux
import { closeModal } from "../../features.js/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const Modal = ({ modal, showModal }) => {
  const dispatch = useDispatch();
  const { Modal } = useSelector((state) => state.ui);
  //   console.log(Modal);
  return (
    <div
      className={`${
        Modal.open ? "block" : "hidden"
      } modal-container bg-[rgba(0,0,0,0.5)] fixed top-0 grid place-items-center w-full z-40 h-full`}
    >
      <div className='modal bg-white w-9/12 px-3 py-4 md:w-2/5'>
        <div className='flex justify-end mb-2'>
          <button onClick={() => dispatch(closeModal())}>
            <CloseIcon />
          </button>
        </div>

        <p className='mt-1 first-letter:capitalize text-center md:text-base'>
          are you sure you want to kill Sapa ?
        </p>
        <div className='btns flex justify-between px-2 md:px-0 w-full md:w-3/4 mx-auto gap-4 mt-5 first-letter:capitalize'>
          <button
            onClick={() => {
              Modal.positiveFn();
              closeModal();
            }}
            className='+ve border border-black w-full py-2 px-8'
          >
            yes
          </button>
          <button
            onClick={() => {
              Modal.negativeFn();
              closeModal();
            }}
            className='-ve border border-red-500 bg-red-600 text-white w-full py-2 px-8'
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
