import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { UserContext } from "../../../context/Context";
import router from "next/router";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const useCtx = useContext(UserContext);

  const handleLogin = () => {
    if (!mail || !password) {
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
          useCtx.handleSetSubType(data.type_sub);
          toast("connecté");
          router.push("/");
        });
      })
      .catch((e) => {
        console.log(e.message);
        toast.error("échec, veuillez réessayer");
      });
  };

  return (
    <main className="main-inscription">
      <div className="filter"></div>
      <nav className="header-inscri">
        <ul className="header--inscription">
          <li>
            <img
              width={100}
              height={100}
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            />
          </li>
          <li className="button-inscri-link">
            <Link href="/netflix">s&apos;inscrire</Link>
          </li>
        </ul>
      </nav>
      <div className="block--main login-flex">
        <div className="login">
          <h2>S&apos;identifier</h2>
          <form
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="form-login--flex"
          >
            <input
              type="text"
              placeholder="adresse email"
              onChange={(e) => setMail(e.currentTarget.value)}
            ></input>
            <input
              type="password"
              placeholder="mot de passe"
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
