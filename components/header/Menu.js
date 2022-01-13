import React, { useEffect, useContext, useState } from "react";
import style from "./Menu.module.css";
import Link from "next/link";
import { UserContext } from "../../context/Context";

function Menu() {
  const useCtx = useContext(UserContext);
  const [tokenKey, setTokenKey] = useState("");

  useEffect(() => {
    setTokenKey(useCtx.userToken);
  }, [useCtx.userToken]);

  console.log(useCtx);

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
