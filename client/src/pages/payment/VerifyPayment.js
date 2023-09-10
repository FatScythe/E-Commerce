import { useSearchParams } from "react-router-dom";
// Components
import PaystackVerification from "./paystack";
import Error1 from "../../component/loaders/error";
import StripeVerification from "./stripe/stripeVerification";

const VerifyPayment = () => {
  const [queryParameters] = useSearchParams();
  const mode = queryParameters.get("mode");

  if (mode === "paystack") {
    return <PaystackVerification />;
  }

  if (mode === "stripe") {
    return <StripeVerification />;
  }

  if (mode === "flutter") {
    return <div> Verify Stripe Payment</div>;
  }

  return <Error1 />;
};

export default VerifyPayment;
