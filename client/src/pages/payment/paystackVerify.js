// import { useSearchParams } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
// Hook
import useSWR from "swr";
// Utils
import url from "../../utils/url";
// Componenets
import Loader1 from "../../component/loaders/loader1";
import TransactionError from "./error";
import TransactionSuccess from "./success";
import Error1 from "../../component/loaders/error";

const VerifyPaymentPaystack = () => {
  const { order } = useSelector((store) => store.cart);
  // const [queryParameters] = useSearchParams();
  // const ref = queryParameters.get("ref");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, isLoading, error } = useSWR(
    url + "/api/v1/payment/paystack/verifyPayment/" + order?._id,
    fetcher
  );

  if (isLoading)
    return (
      <div>
        <Loader1 />
      </div>
    );
  if (error) return <Error1 />;

  if (data && data.data.status !== "success") return <TransactionError />;

  return <TransactionSuccess />;
};

export default VerifyPaymentPaystack;
