import { Navigate } from "react-router-dom";
// Hook
import useSWR from "swr";
// Redux
import { useSelector } from "react-redux";
// Toastify
import { toast } from "react-toastify";
// Component
import Loader1 from "../../../component/loaders/loader1";
import Error1 from "../../../component/loaders/error";
import { CancelIcon, ChangeIcon, EditIcon } from "../../../assets/icons/icon";
// Utils
import url from "../../../utils/url";

const AllUsers = ({ user }) => {
  const { dark } = useSelector((store) => store.ui);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(url + "/api/v1/users", fetcher, {
    refreshInterval: 5000,
  });
  if (user.role !== "admin") {
    return <Navigate to='/' />;
  }

  if (isLoading) {
    return (
      <div>
        <Loader1 />
      </div>
    );
  }

  if (error || (data && data?.msg)) {
    const message = error ? error.message : data.msg;
    return (
      <div>
        <Error1 msg={message} />
      </div>
    );
  }

  const { count, users } = data;

  return (
    <section id='users'>
      <h2
        className={`capitalize font-semibold text-xl sm:text-2xl mb-10 ${
          dark ? "text-white" : "text-black"
        }`}
      >
        All Users
      </h2>
      <h2 className='text-base italic font-semibold'>
        Number of users: {count}
      </h2>
      <div className='wrapper md:mt-5 grid grid-cols-12 gap-8'>
        {users.map((user) => {
          return <UserCard key={user._id} user={user} />;
        })}
      </div>
    </section>
  );
};

export default AllUsers;

const UserCard = ({ user }) => {
  const { _id, email, role, name, avatar, isVerified } = user;
  const handleBlock = async () => {
    try {
      const response = await fetch(url + "/api/v1/users/" + _id, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.msg);
        return;
      }

      toast.success(data.msg);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    toast.info("Edit functionality unavailable :(");
  };

  return (
    <div className='col-span-12 sm:col-span-6 lg:col-span-4 bg-slate-400 rounded-md p-2'>
      <header className='text-center'>
        <img
          src={avatar}
          alt={name}
          className='w-36 h-36 rounded-full object-cover mx-auto my-0'
        />
        <h3>{name}</h3>
      </header>
      <footer>
        <h4 className='first-letter:uppercase lowercase'>email: {email}</h4>
        <h4 className='first-letter:uppercase lowercase'>role: {role}</h4>
        <h4 className='first-letter:uppercase lowercase'>
          account active: {isVerified ? "true" : "false"}
        </h4>
        <div className='flex justify-between items-center w-11/12 mx-auto my-3 bg-white p-2 rounded-2xl'>
          <button
            title={isVerified ? "block user" : "unblock user"}
            onClick={handleBlock}
            className={`${
              isVerified ? "bg-red-400" : "bg-green-500"
            } hover:opacity-70 p-2 rounded-full`}
          >
            {isVerified ? (
              <CancelIcon className='w-6 h-6' />
            ) : (
              <ChangeIcon className='w-6 h-6' />
            )}
          </button>
          <button
            title='edit user'
            onClick={handleEdit}
            className='bg-blue-500 hover:bg-blue-400 p-2 rounded-full'
          >
            <EditIcon />
          </button>
        </div>
      </footer>
    </div>
  );
};
