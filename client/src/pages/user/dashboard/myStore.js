import { Navigate } from "react-router-dom";

const MyStore = ({ user }) => {
  if (user.role === "user") {
    return <Navigate to='/' />;
  }
  return (
    <section>
      <h2 className='capitalize font-semibold text-xl sm:text-2xl mb-10'>
        My Store
      </h2>
      My store
    </section>
  );
};

export default MyStore;
