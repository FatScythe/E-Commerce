import { useSearchParams } from "react-router-dom";
// Components
import PaystackVerification from "./paystack";
import StripeVerification from "./stripe/stripeVerification";
import FlutterwaveVerification from "./flutterwave";
import NotNav from "../../component/noNavHeader";

const VerifyPayment = () => {
  const [queryParameters] = useSearchParams();
  const mode = queryParameters.get("mode");
  return (
    <>
      <NotNav
        name='Verify Payment'
        navLinks={{ store: "stores", search: "search", auth: "auth" }}
      />
      {mode === "paystack" && <PaystackVerification />}
      {mode === "stripe" && <StripeVerification />}
      {mode === "flutterwave" && <FlutterwaveVerification />}
    </>
  );
};

export default VerifyPayment;
