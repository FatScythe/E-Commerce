import { useSearchParams } from "react-router-dom";
// Components
import PaystackVerification from "./paystack";
import Error1 from "../../component/loaders/error";
import StripeVerification from "./stripe/stripeVerification";
import FlutterwaveVerification from "./flutterwave";

const VerifyPayment = () => {
  const [queryParameters] = useSearchParams();
  const mode = queryParameters.get("mode");

  if (mode === "paystack") {
    return <PaystackVerification />;
  }

  if (mode === "stripe") {
    return <StripeVerification />;
  }

  if (mode === "flutterwave") {
    return <FlutterwaveVerification />;
  }

  return <Error1 />;
};

export default VerifyPayment;
