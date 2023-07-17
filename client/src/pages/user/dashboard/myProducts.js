import { Navigate } from "react-router-dom";

const MyProducts = ({ user }) => {
  if (user.role === "user") {
    return <Navigate to='/' />;
  }
  return <section id='my-products'></section>;
};

export default MyProducts;
