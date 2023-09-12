import { useSearchParams } from "react-router-dom";
// Hook
import useSWR from "swr";
// Utils
import url from "../../../utils/url";
// Components
import Loader1 from "../../../component/loaders/loader1";
import Transaction from "../TransactionResult";
import Error1 from "../../../component/loaders/error";
// Toastify
import { toast } from "react-toastify";
// Redux
import { useDispatch } from "react-redux";
import { removeOrder } from "../../../features/cart/cartSlice";

const PaystackVerification = () => {
  const [queryParameters] = useSearchParams();
  const dispatch = useDispatch();
  const ref = queryParameters.get("reference");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    url + "/api/v1/payment/paystack/verifyPayment/" + ref,
    fetcher
  );
  if (isLoading)
    return (
      <div>
        <Loader1 />
      </div>
    );
  if (error) return <Error1 />;

  if (data && data.data?.status !== "success" && data?.msg) {
    toast.error(data.msg);
    return <Transaction type='error' />;
  }
  dispatch(removeOrder());
  return <Transaction type='success' />;
};

export default PaystackVerification;
