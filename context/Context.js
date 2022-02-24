import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = React.createContext();

function Context(props) {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");
  const [cart, setCart] = useState([]);

  // NETFLIX PART //

  const [mailNetflix, setMailNetflix] = useState("");
  const [passwordNetflix, setPasswordNetflix] = useState("");

  const handleSetMailNetflix = (mail) => {
    setMailNetflix(mail);
  };

  const handleSetPasswordNetflix = (password) => {
    setPasswordNetflix(password);
  };

  // END NETFLIX PART //

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

    const productNew = { ...product, qty: 1, tot: product.price };

    cart.push(productNew);
    const newCart = [...cart];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("article ajouté au panier");
  };

  const deleteCartHandler = (product) => {
    const filteredCart = cart.filter((el) => {
      return el.id !== product.id;
    });
    const newCart = [...filteredCart];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const incrementQtyCartHandler = (product) => {
    const objIndex = cart.findIndex((el) => el.id === product.id);
    cart[objIndex].qty = cart[objIndex].qty + 1;
    cart[objIndex].tot = cart[objIndex].price * cart[objIndex].qty;

    console.log(cart[objIndex].qty);

    const newCart = [...cart];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const decrementQtyCartHandler = (product) => {
    const objIndex = cart.findIndex((el) => el.id === product.id);
    cart[objIndex].qty = cart[objIndex].qty - 1;
    cart[objIndex].tot = cart[objIndex].price * cart[objIndex].qty;

    console.log(objIndex, "index");

    if (cart[objIndex].qty === 0) {
      cart.splice(objIndex, 1);
      const newCart = [...cart];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = [...cart];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
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
    mailNetflix,
    passwordNetflix,
    putToken,
    deleteToken,
    putUserId,
    addCartHandler,
    deleteCartHandler,
    incrementQtyCartHandler,
    decrementQtyCartHandler,
    handleSetMailNetflix,
    handleSetPasswordNetflix,
  };

  console.log("cart");
  console.log(cart);
  console.log("cart");

  return (
    <UserContext.Provider value={funcUser}>
      {props.children}
    </UserContext.Provider>
  );
}

export default Context;
