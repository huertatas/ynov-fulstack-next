import React, { useState, useContext } from "react";
import Image from "next/image";
import logoNetflix from "../../../public/NetflixLogo.svg";
import Link from "next/link";
import toast from "react-hot-toast";
import { UserContext } from "../../../context/Context";
import router from "next/router";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const useCtx = useContext(UserContext);

  const handleLogin = () => {
    if (!mail && !password) {
      return;
    }

    let body = { email: mail, password: password };

    fetch(`${process.env.API_URL}api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.id === undefined) {
            toast.error("profil non existant");
            return;
          }
          useCtx.putToken(data.token);
          useCtx.putUserId(data.id);
          toast("connecté");
          // router.push("/profil");
        });
      })
      .catch((e) => e.message);
  };

  return (
    <main className="main-inscription">
      <nav>
        <ul className="header--inscription">
          <li>
            <Image width={50} height={50} src={logoNetflix} />
          </li>
          <li>
            <Link href="/netflix">s'inscrire</Link>
          </li>
        </ul>
      </nav>
      <div className="block--main login-flex">
        <div className="login">
          <h2>titre</h2>
          <form
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="form-login--flex"
          >
            <input
              type="text"
              onChange={(e) => setMail(e.currentTarget.value)}
            ></input>
            <input
              type="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            ></input>
            <button>connexion</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
