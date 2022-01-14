import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "../../context/Context";

function Cart() {
  const userCtx = useContext(UserContext);

  console.log(userCtx.cart.length);

  return (
    <>
      <Link href="/shop/checkout">
        <Image
          src="/cart.svg"
          className="cart"
          alt=""
          height={50}
          width={50}
        ></Image>
      </Link>
      <div>{userCtx.cart.length}</div>
    </>
  );
}

export default Cart;
