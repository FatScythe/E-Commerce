import { useSearchParams } from "react-router-dom";
// Hook
import useSWR from "swr";
// Utils
import url from "../../../utils/url";
// Componenets
import Loader1 from "../../../component/loaders/loader1";
import Transaction from "../TransactionResult";
import Error1 from "../../../component/loaders/error";
// Toastify
import { toast } from "react-toastify";

const StripeVerification = () => {
  const [queryParameters] = useSearchParams();
  const paymentIntent = queryParameters.get("payment_intent");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    url +
      "/api/v1/payment/stripe/verifyPayment/" +
      paymentIntent +
      "/" +
      JSON.parse(localStorage.getItem("order"))?._id || null,
    fetcher
  );
  if (isLoading)
    return (
      <div className='mt-20'>
        <Loader1 />
      </div>
    );
  if (error) {
    return <Error1 />;
  }

  if (data && data?.status !== "succeeded" && data?.msg) {
    toast.error(data.msg);
    return <Transaction type='error' />;
  }
  return <Transaction type='success' />;
};

export default StripeVerification;
