import { Navigate } from "react-router-dom";

const MyStore = ({ user }) => {
  if (user.role === "user") {
    return <Navigate to='/' />;
  }
  return <div>My store</div>;
};

export default MyStore;
