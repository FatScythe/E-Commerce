// Hooks
import useTitle from "../../hooks/useTitle";
// Components
import NotNav from "../../component/noNavHeader";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const User = () => {
  useTitle("User Settings");
  const { user } = useSelector((store) => store.user);
  console.log(user);
  if (!user) {
    return <Navigate to='/' />;
  }
  return (
    <section id='user' className='container'>
      <NotNav navLinks={{ store: "stores", search: "search", cart: "cart" }} />
      <h1>USER</h1>
    </section>
  );
};

export default User;
