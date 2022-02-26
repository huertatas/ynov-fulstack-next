import React, { useContext } from "react";
import HeaderNetflix from "../../components/header/HeaderNetflix";
import { UserContext } from "../../context/Context";

function Compte() {
  const useCtx = useContext(UserContext);

  const handleUnsubscription = () => {
    fetch(`${process.env.API_URL}api/v1/checkout/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `${useCtx.userToken}`,
      },
      body: JSON.stringify({ userId: useCtx.userId }),
    })
      .then(async (res) => {
        const recep = await res.json();
        // mettre token d'abo
        useCtx.putToken(recep.token);
        toast.success(`paiement réussis`);
        console.log(recep);
      })
      .catch((e) => e.message);
  };

  return (
    <div className="main-home">
      <HeaderNetflix />
      <main className="main--homepage-net compte">
        <button onClick={handleUnsubscription}>Annuler l'abonnement</button>
      </main>
    </div>
  );
}

export default Compte;
