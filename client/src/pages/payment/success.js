import { useSelector } from "react-redux";
const TransactionSuccess = () => {
  const { user } = useSelector((store) => store.user);
  // Check if user exist

  return <div>Transaction Success page Thank you {user.name}</div>;
};

export default TransactionSuccess;
