// Hooks
import useTitle from "../../hooks/useTitle";
// Components
import NotNav from "../../component/noNavHeader";

const User = () => {
  useTitle("User Settings");
  return (
    <section id='user' className='container'>
      <NotNav navLinks={{ store: "stores", search: "search", cart: "cart" }} />
      <h1>USER</h1>
    </section>
  );
};

export default User;
