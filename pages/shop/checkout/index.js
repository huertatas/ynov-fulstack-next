import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/Context";
import { loadStripe } from "@stripe/stripe-js";
import stripeService from "../../../services/stripe.service";

const stripePromise = loadStripe(
  "pk_test_51KHlqyAw1gIXHZCzDqsbPPbFIw0pOGB5qOwjJEKGK6U48K2pVggB4eOoDpBk936flMAF6OYZ0J27J8fjkccCJYu800KV1pgGx2"
);

function Checkout() {
  const userCtx = useContext(UserContext);
  const [totalCost, setTotalCost] = useState(0);

  const handleConfirmation = async () => {
    const token = localStorage.getItem("token");
    let cart = [{ totalCost: totalCost }, { user: userCtx.userId }];

    userCtx.cart.map((el) => {
      cart.push(el);
    });

    console.log(cart);

    try {
      const stripe = await stripePromise;
      const response = await stripeService.createSession(token, cart);
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userCtx.cart.length > 0) {
      let tot = 0;
      userCtx.cart.map((el) => {
        tot = tot + el.tot;
      });

      setTotalCost(tot);
    }
  }, [userCtx]);

  return (
    <div className="checkout-container">
      <div className="checkout-block">
        <div className="product-part">
          {userCtx.cart.length === 0 && "panier vide"}
          {userCtx.cart.map((el) => {
            return (
              <>
                <div
                  key={el.id}
                  onClick={() => {
                    userCtx.deleteCartHandler(el);
                  }}
                  className="products-checkout"
                >
                  {el.title}: {el.price}€ x {el.qty}
                </div>
                <button
                  onClick={() => {
                    userCtx.incrementQtyCartHandler(el);
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    userCtx.decrementQtyCartHandler(el);
                  }}
                >
                  -
                </button>
              </>
            );
          })}
        </div>
        <div className="button-part">
          <h3>total price: {totalCost}</h3>
          <button onClick={handleConfirmation}>payer</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
