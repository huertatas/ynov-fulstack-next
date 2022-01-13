import React from "react";

import { getProducts } from "../../graphql/queries/product";
import { useQuery } from "@apollo/react-hooks";

const Index = () => {
  const { loading, error, data } = useQuery(getProducts);

  if (loading) {
    return "loading...";
  }

  if (error) {
    console.log(error);
    return null;
  }

  console.log(data);

  return (
    <div className="shop__grid">
      {data.getProducts.map((product) => (
        <div className="product__card" key={product.id}>
          {product.title}: {product.price} euros
        </div>
      ))}
    </div>
  );
};

export default Index;
