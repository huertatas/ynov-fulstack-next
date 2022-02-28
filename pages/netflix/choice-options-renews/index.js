import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
// import router from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { UserContext } from "../../../context/Context";
import toast from "react-hot-toast";
import router from "next/router";

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51KHlqyAw1gIXHZCzDqsbPPbFIw0pOGB5qOwjJEKGK6U48K2pVggB4eOoDpBk936flMAF6OYZ0J27J8fjkccCJYu800KV1pgGx2"
);

function OptionsRenew() {
  const useCtx = useContext(UserContext);

  const [load, setLoad] = useState(false);
  const [mailRenew, setMailRenew] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const [standard, setStandard] = useState(true);
  const [prenium, setPrenium] = useState(false);
  let standardSelected = "";
  let preniumSelected = "";

  if (standard) {
    standardSelected = "selected";
    preniumSelected = "";
  }

  if (prenium) {
    preniumSelected = "selected";
    standardSelected = "";
  }

  const handleSubscription = async (token, objDetails) => {
    setLoad(true);
    const cardElement = elements.getElement(CardElement);

    if (cardElement === null) {
      console.log("pas bon", cardElement);
      return;
    }

    // Create Payment Method
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    objDetails.payment_method = paymentMethod.id;

    fetch(`${process.env.API_URL}api/v1/checkout/subscriptions`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(objDetails),
    })
      .then(async (res) => {
        const recep = await res.json();
        useCtx.putToken(recep.token);
        toast.success(`paiement réussis`);
        setLoad(false);
        router.push("/");
      })
      .catch((e) => {
        setLoad(false);
        toast.error(e.message);
        e.message;
      });
  };

  const handleFinalizeInscription = () => {
    setLoad(true);
    if (!mailRenew || !useCtx.userToken) {
      toast.error("erreur");
      return;
    }

    let planNetflix;
    let typePlan = "";

    if (standard) {
      planNetflix = "price_1KUZiJAw1gIXHZCzXE2rmDVd";
      typePlan = "standard";
    } else {
      planNetflix = "price_1KUZjLAw1gIXHZCzGABXiWWi";
      typePlan = "prenium";
    }

    let objSub = {
      plan: planNetflix,
      payment_method: "",
      userId: useCtx.userId,
      mail: mailRenew,
      type: typePlan,
    };
    setLoad(false);
    handleSubscription(useCtx.userToken, objSub);
  };

  return (
    <main className="main-inscription password-inscription">
      {load && (
        <div className="loader">
          {" "}
          <Image
            className="spin-load rotate-in-center"
            width={100}
            height={100}
            src="/load.svg"
          />{" "}
        </div>
      )}
      <nav className="header-inscri">
        <ul className="header--inscription">
          <li>
            <img width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
          </li>
          <li>
            <Link href="/netflix/login">s&apos;identifier</Link>
          </li>
        </ul>
      </nav>
      <div className="block--main">
        <div className="choice">
          <div className="choice--details-block">
            Renouvellez votre abonnement
          </div>
          <div className="choice--options-block">
            {/* <div className="choice--options-details"></div> */}
            <div
              onClick={() => {
                setStandard(true);
                setPrenium(false);
              }}
              className={`choice-options-el`}
            >
              <div className={`square-type ${standardSelected}`}>Standard</div>
              <div className={`line-details border ${standardSelected}`}>
                30 €
              </div>
              <div className={`line-details ${standardSelected}`}>
                Accès au catalogue Netflix
              </div>
            </div>
            <div
              onClick={() => {
                setStandard(false);
                setPrenium(true);
              }}
              className={`choice-options-el`}
            >
              <div className={`square-type ${preniumSelected}`}>Prenium</div>
              <div className={`line-details border ${preniumSelected}`}>
                {" "}
                60 €
              </div>
              <div className={`line-details ${preniumSelected}`}>
                Accès au catalogue Netflix ainsi qu&apos;au nouveauté 2022
              </div>
            </div>
          </div>
          <div className="choice--explenations-block">
            <CardElement />
          </div>
          <input
            className="input-renew"
            onChange={(e) => {
              setMailRenew(e.currentTarget.value);
            }}
            placeholder="votre adresse mail"
          ></input>
          <div className="choice--button-block">
            <button
              className="button-inscri-link dir"
              onClick={() => {
                handleFinalizeInscription();
              }}
            >
              payer
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function NetflixFinalizationPageRenew() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <OptionsRenew />
      </Elements>
    </>
  );
}

export default NetflixFinalizationPageRenew;
