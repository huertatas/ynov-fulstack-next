import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = React.createContext();

function Context(props) {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");
  const [cart, setCart] = useState([]);

  const putToken = (token) => {
    localStorage.setItem("token", token);
    setUserToken(token);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserToken("");
    toast.success("deconnecté");
  };

  const putUserId = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };

  console.log("---+++---");
  console.log(cart);

  const addCartHandler = (product) => {
    if (cart.filter((e) => e.id === product.id).length > 0) {
      return;
    }

    cart.push(product);
    const newCart = [...cart];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  //probleme avec delete, ça delete pas

  const deleteCartHandler = (product) => {
    cart.filter((el) => {
      return el !== product.id;
    });
    const newCart = [...cart];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCart(parsedCart);
    }

    if (token) {
      setUserToken(token);
      setUserId(id);
    }
  }, [userToken]);

  const funcUser = {
    userId,
    userToken,
    cart,
    putToken,
    deleteToken,
    putUserId,
    addCartHandler,
    deleteCartHandler,
  };

  return (
    <UserContext.Provider value={funcUser}>
      {props.children}
    </UserContext.Provider>
  );
}

export default Context;
