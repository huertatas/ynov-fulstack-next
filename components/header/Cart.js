import React from "react";
import Image from "next/image";
import Link from "next/link";

function Cart() {
  return (
    <Link href="/shop/checkout">
      <Image src="/cart.svg" className="cart" alt="" height={50} width={50}></Image>
    </Link>
  );
}

export default Cart;
