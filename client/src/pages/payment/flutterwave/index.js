import { useSearchParams } from "react-router-dom";
// Hook
import useSWR from "swr";
// Utils
import url from "../../../utils/url";
// Componenets
import Loader1 from "../../../component/loaders/loader1";
import TransactionError from "../error";
import TransactionSuccess from "../success";
import Error1 from "../../../component/loaders/error";
// Toastify
import { toast } from "react-toastify";

const FlutterwaveVerification = () => {
  const [queryParameters] = useSearchParams();
  const ref = queryParameters.get("transaction_id");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    url + "/api/v1/payment/flutterwave/verifyPayment/" + ref,
    fetcher
  );
  if (isLoading)
    return (
      <div>
        <Loader1 />
      </div>
    );
  if (error) return <Error1 />;

  if (data && data.data.status !== "successful") {
    toast.error(data.message);
    return <TransactionError />;
  }

  return <TransactionSuccess />;
};

export default FlutterwaveVerification;
