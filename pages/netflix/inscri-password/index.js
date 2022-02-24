import React, { useContext, useState } from "react";
import logoNetflix from "../../../public/NetflixLogo.svg";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { UserContext } from "../../../context/Context";

function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const useCtx = useContext(UserContext);
  console.log(useCtx.mailNetflix);

  const handleGotoOptions = () => {
    useCtx.handleSetPasswordNetflix(password);
    router.push("/netflix/choice-options");
  };

  return (
    <main className="main-inscription password-inscription">
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
          <h4 className="password--label">titre</h4>
          <form className="form-password">
            <input
              type="password"
              placeholder="mot de passe"
              onChange={(e) => setPassword(e.currentTarget.value)}
            ></input>
            <input
              type="password"
              placeholder="confirmez votre mot de passe"
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleGotoOptions();
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

export default Password;
