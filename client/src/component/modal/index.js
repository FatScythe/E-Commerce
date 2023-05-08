import "./modal.css";
import { CloseIcon } from "../../assets/icons/icon";
// Redux
import { closeModal } from "../../features.js/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  const { Modal } = useSelector((state) => state.ui);

  return (
    <div className={`modal-container`} onClick={() => dispatch(closeModal())}>
      <div className='modal'>
        <div className='close'>
          <button onClick={() => dispatch(closeModal())}>
            <CloseIcon />
          </button>
        </div>

        <p className='question'>
          {Modal.question || "are you sure you want to kill Sapa ?"}
        </p>
        <div className='btns'>
          <button
            onClick={() => {
              Modal.positiveFn();
              closeModal();
            }}
            className='positive'
          >
            yes
          </button>
          <button
            onClick={() => {
              Modal.negativeFn();
              closeModal();
            }}
            className='negative'
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
