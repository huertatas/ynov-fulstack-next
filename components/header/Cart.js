import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "../../context/Context";

function Cart() {
  const userCtx = useContext(UserContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let countHolder = 0;

    userCtx.cart.map((el) => {
      countHolder = countHolder + el.qty;
    });

    setCount(countHolder);
  }, [userCtx]);

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
      <div>{count}</div>
    </>
  );
}

export default Cart;
