import React, { useContext } from "react";
import { UserContext } from "../../../context/Context";

function Checkout() {
  const userCtx = useContext(UserContext);

  return (
    <div className="checkout-container">
      <div className="checkout-block">
        <div className="product-part">
          {userCtx.cart.title ? `${userCtx.cart.title}: ${userCtx.cart.price} euros` : "votre panier est vide"}
        </div>
        <div className="button-part">
          <button>payer</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
