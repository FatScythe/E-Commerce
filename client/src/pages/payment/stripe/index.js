import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Redux
import { useSelector } from "react-redux";

import CheckoutForm from "./stripeCheckoutForm";
import "./stripe.css";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51MoKgODdZHl426ILzpWO2AQ2O48q2QCaTOWE0np3vqkxckUSH9LS7j7PLg4DoE7HEsk5l0t9z2jqbBbSnrHcuMTf00Rrx0o9u3"
);

export default function Stripe() {
  const { order } = useSelector((store) => store.cart);
  const navigate = useNavigate();

  if (!order) {
    return navigate("/");
  }

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret: order.clientSecret,
    appearance,
  };

  return (
    <section id='stripe' className='stripe'>
      {order.clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </section>
  );
}
