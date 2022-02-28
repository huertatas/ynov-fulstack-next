import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { UserContext } from "../../context/Context";

function Inscription() {
  const useCtx = useContext(UserContext);
  const [mail, setMail] = useState("");

  const handleGotoPassword = () => {
    if (!mail) {
      return;
    }

    useCtx.handleSetMailNetflix(mail);
    router.push("netflix/inscri-password");
  };

  return (
    <main className="main-inscription">
      <div className="filter"></div>
      <nav className="header-inscri">
        <ul className="header--inscription">
          <li>
            <img width={100} height={100} src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
          </li>
          <li className="button-inscri-link">
            <Link href="/netflix/login">s&apos;identifier</Link>
          </li>
        </ul>
      </nav>
      <div className="block--main">
        <div>
          <h2>Films, séries TV et bien plus en illimité.</h2>
          <h3>Où que vous soyez. Annulez à tout moment.</h3>
          <h4>
            Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous
            abonner ou réactiver votre abonnement.
          </h4>
          <form>
            <input
              onChange={(e) => setMail(e.currentTarget.value)}
              placeholder="adresse email"
              type="email"
            ></input>
            <button
            className="but"
              onClick={(e) => {
                e.preventDefault();
                handleGotoPassword();
              }}
            >
              suivant
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Inscription;
