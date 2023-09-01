import "./cart.css";
import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
// hook
import useTitle from "../../hooks/useTitle";
// component
import NotNav from "../../component/noNavHeader";
import { CloseIcon, ShoppingBagIcon } from "../../assets/icons/icon";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeItem,
  toggleAmount,
  calculateTotal,
} from "../../features/cart/cartSlice";
import { closeModal, showModal } from "../../features/ui/uiSlice";

const Bag = () => {
  useTitle("Cart");
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const question = "clear all shopping bag items?";
  const positiveFn = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };
  const negativeFn = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    dispatch(calculateTotal());
  });

  return (
    <section className='container' id='cart'>
      <NotNav navLinks={{ store: "stores", search: "search", auth: "auth" }} />
      {cartItems.length > 0 && (
        <div className='w-full flex justify-end items-end mt-3 mb-5'>
          <button
            onClick={() =>
              dispatch(
                showModal({ open: true, question, positiveFn, negativeFn })
              )
            }
            className='bg-red-400 px-2 py-3 hover:bg-red-300 shadow-md rounded-md sm:text-base text-white'
          >
            clear cart
          </button>
        </div>
      )}
      <div className='bag-items'>
        {!cartItems.length > 0 && (
          <div className='no-item'>
            <span>
              <ShoppingBagIcon />
            </span>
            <p className='text-base sm:text-lg'>No item in shopping bag</p>
          </div>
        )}
        {cartItems.length > 0 &&
          cartItems.map((item) => <BagItem key={item.id} {...item} />)}
      </div>

      {cartItems.length > 0 && (
        <div className='bag-total'>
          <BagTotal />
          <BagLinks user={user} />
        </div>
      )}
    </section>
  );
};
export default Bag;

export const BagItem = ({ id, name, image, price, amount, size, color }) => {
  const dispatch = useDispatch();

  return (
    <div className='bag-item'>
      <div className='title-wrapper'>
        <img src={image} alt={name} draggable={false} />
        <div className='title'>
          <p>{name}</p>
          <p>
            size:<span className='uppercase'>{size}</span>
          </p>
          <p>
            color:
            <span
              title={color}
              style={{ backgroundColor: color }}
              className='h-4 w-4 rounded-full'
            ></span>
          </p>
          <div className='controls'>
            <button
              className='decrease'
              onClick={() => dispatch(toggleAmount({ id, type: "-" }))}
            >
              -
            </button>
            <div className='number'>{amount}</div>
            <button
              className='increase'
              onClick={() => dispatch(toggleAmount({ id, type: "+" }))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className='subtitle-wrapper'>
        <button onClick={() => dispatch(removeItem(id))}>
          <CloseIcon className='w-4 sm:w-6 h-4 sm:h-6' />
        </button>
        <p>${price}</p>
      </div>
    </div>
  );
};

export const BagTotal = () => {
  const cart = useSelector((store) => store.cart);

  const { amount, total, shipping } = cart;
  let grandTotal = total + shipping;
  grandTotal = Number(grandTotal).toFixed(0);

  return (
    <div className='bag-calc'>
      <div className='detail'>
        <p className='title'>products in bag:</p>
        <span className='amount'>{amount} items</span>
      </div>

      <div className='detail'>
        <p className='title'>shipping:</p>
        <span className='amount'>${shipping}</span>
      </div>

      <div className='detail'>
        <p className='title'>sub-total:</p>
        <span className='amount'>${total}</span>
      </div>

      <div className='detail'>
        <p className='title'>grand total:</p>
        <span className='amount'>${grandTotal}</span>
      </div>
    </div>
  );
};

const BagLinks = ({ user }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!user) {
      return navigate("/auth");
    }

    navigate("/checkout");
  };
  return (
    <div className='bag-proceed'>
      <div>
        <button onClick={handleClick}>
          {user ? "proceed to checkout" : "sign in"}
        </button>
      </div>
      <div className='link'>
        <Link to='/products'>continue shopping</Link>
      </div>
    </div>
  );
};
