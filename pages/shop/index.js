import React, { useContext } from "react";
import { UserContext } from "../../context/Context";
import { useRouter } from "next/router";

import { getProducts } from "../../graphql/queries/product";
import { useQuery } from "@apollo/react-hooks";

const ShopPage = () => {
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const { loading, error, data } = useQuery(getProducts);

  if (loading) {
    return "loading...";
  }

  if (error) {
    console.log(error);
    return null;
  }

  return (
    <div className="shop__grid">
      {data.getProducts.map((product) => (
        <div
          className="product__card"
          key={product.id}
          onClick={() => {
            userCtx.addCartHandler(product);
          }}
        >
          {product.title}: {product.price} euros
        </div>
      ))}
    </div>
  );
};

export default ShopPage;
