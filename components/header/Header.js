import React from "react";
import style from "./Header.module.css";
import vercel from "../../public/vercel.svg";
import Image from "next/image";
import Cart from "./Cart";
import Menu from "./Menu";

function Header() {
  return (
    <header className={style.header_container}>
      <div className={style["logo-contain"]}>
        <Image src="/vercel.svg" alt="" width={100} height={100} />
      </div>
      <Menu />
      <div className={style["logo-contain"]}>
        <Cart />
      </div>
    </header>
  );
}

export default Header;
