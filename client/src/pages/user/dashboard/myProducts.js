import { Navigate } from "react-router-dom";

const MyProducts = ({ user }) => {
  if (user.role === "user") {
    return <Navigate to='/' />;
  }
  return <div>My products</div>;
};

export default MyProducts;
