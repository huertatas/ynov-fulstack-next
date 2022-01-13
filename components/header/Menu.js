import React, { useEffect, useContext, useState } from "react";
import style from "./Menu.module.css";
import Link from "next/link";
import { UserContext } from "../../context/Context";
import router from "next/router";

function Menu() {
  const useCtx = useContext(UserContext);
  const [tokenKey, setTokenKey] = useState("");

  useEffect(() => {
    setTokenKey(useCtx.userToken);
  }, [useCtx.userToken]);

  return (
    <nav className={style["link_header"]}>
      <Link href="/">Home</Link>
      {!tokenKey && <Link href="/login">Login</Link>}
      {tokenKey && <Link href="/profil">Profil</Link>}
      <Link href="/shop">Shop</Link>
      {tokenKey && (
        <h2
          onClick={() => {
            useCtx.deleteToken();
            router.push("/");
          }}
          className={style.logout}
        >
          Se déconnecter
        </h2>
      )}
    </nav>
  );
}

export default Menu;
