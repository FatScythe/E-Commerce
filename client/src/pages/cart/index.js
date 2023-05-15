import "./cart.css";
import { Link } from "react-router-dom";
// hook
import useTitle from "../../hooks/useTitle";
import useShowNav from "../../hooks/useShowNav";
// component
import NotNav from "../../component/noNavHeader";
import { CloseIcon } from "../../assets/icons/icon";
// images
import img from "../../assets/images/img.png";
// redux
import { useSelector } from "react-redux";

const Bag = () => {
  useTitle("Cart");
  useShowNav(false);
  return (
    <section className='container' id='cart'>
      <NotNav navLinks={{ store: "stores", search: "search", auth: "auth" }} />
      <div className='bag-items'>
        <BagItem />
        <BagItem />
      </div>

      <BagTotal />
    </section>
  );
};
export default Bag;

const BagItem = () => {
  return (
    <div className='bag-item'>
      <div className='title-wrapper'>
        <img src={img} alt='product-name' draggable={false} />
        <div className='title'>
          <p>product name</p>
          <p>
            size:<span>XL</span>
          </p>
          <p>
            color:<span>Red</span>
          </p>
          <div className='controls'>
            <button className='increase'>+</button>
            <div className='number'>0</div>
            <button className='decrease'>-</button>
          </div>
        </div>
      </div>

      <div className='subtitle-wrapper'>
        <button>
          <CloseIcon />
        </button>
        <p>$50.00</p>
      </div>
    </div>
  );
};

const BagTotal = () => {
  const { isLoggedIn } = useSelector((state) => state.ui);

  return (
    <div className='bag-total'>
      <div className='bag-calc'>
        <div className='detail'>
          <p className='title'>products in cart:</p>
          <span className='amount'>2 items</span>
        </div>

        <div className='detail'>
          <p className='title'>shipping:</p>
          <span className='amount'>$2.50</span>
        </div>

        <div className='detail'>
          <p className='title'>sub-total:</p>
          <span className='amount'>$39.4</span>
        </div>

        <div className='detail'>
          <p className='title'>grand total:</p>
          <span className='amount'>$41.9</span>
        </div>
      </div>

      <div className='bag-proceed'>
        <div>
          <button>{isLoggedIn ? "proceed to checkout" : "sign in"}</button>
        </div>
        <div className='link'>
          <Link>continue shopping</Link>
        </div>
      </div>
    </div>
  );
};
