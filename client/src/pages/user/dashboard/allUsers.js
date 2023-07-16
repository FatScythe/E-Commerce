import { Navigate } from "react-router-dom";

const AllUsers = ({ user }) => {
  if (user.role !== "admin") {
    return <Navigate to='/' />;
  }

  return <div>All Users</div>;
};

export default AllUsers;
