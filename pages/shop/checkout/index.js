import React, { useContext } from "react";
import { UserContext } from "../../../context/Context";
import { loadStripe } from "@stripe/stripe-js";
import stripeService from "../../../services/stripe.service";

const stripePromise = loadStripe(
  "pk_test_51KHlqyAw1gIXHZCzDqsbPPbFIw0pOGB5qOwjJEKGK6U48K2pVggB4eOoDpBk936flMAF6OYZ0J27J8fjkccCJYu800KV1pgGx2"
);

function Checkout() {
  const userCtx = useContext(UserContext);

  const handleConfirmation = async () => {
    try {
      const stripe = await stripePromise;
      const response = await stripeService.createSession(userCtx.cart);
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("---");
  console.log(userCtx.cart);
  console.log("---");

  return (
    <div className="checkout-container">
      <div className="checkout-block">
        <div className="product-part">
          {userCtx.cart.length === 0 && "panier vide"}
          {userCtx.cart.map((el) => {
            return (
              <div
                key={el.id}
                onClick={userCtx.deleteCartHandler.bind(null, el)}
              >
                {el.title}: {el.price}
              </div>
            );
          })}
        </div>
        <div className="button-part">
          <button
            onClick={handleConfirmation}
            disabled={userCtx.cart.title ? false : true}
          >
            payer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
