import React, { useContext, useState } from "react";
import Image from "next/image";
import logoNetflix from "../../public/NetflixLogo.svg";
import Link from "next/link";
import router from "next/router";
import { UserContext } from "../../context/Context";

function Inscription() {
  const useCtx = useContext(UserContext);
  const [mail, setMail] = useState("");

  const handleGotoPassword = () => {
    useCtx.handleSetMailNetflix(mail);
    router.push("netflix/inscri-password");
  };

  return (
    <main className="main-inscription">
      <nav>
        <ul className="header--inscription">
          <li>
            <Image width={50} height={50} src={logoNetflix} />
          </li>
          <li>
            <Link href="/netflix/login">s'identifier</Link>
          </li>
        </ul>
      </nav>
      <div className="block--main">
        <div>
          <h2>titre</h2>
          <h3>titre</h3>
          <h4>titre</h4>
          <form>
            <input
              onChange={(e) => setMail(e.currentTarget.value)}
              placeholder="mail"
            ></input>
            <button
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
