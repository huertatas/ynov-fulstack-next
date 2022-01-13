import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = React.createContext();

function Context(props) {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");
  const [cart, setCart] = useState({});

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

  console.log(userId);

  const addCartHandler = (product) => {
    setCart(product);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
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
  };

  return (
    <UserContext.Provider value={funcUser}>
      {props.children}
    </UserContext.Provider>
  );
}

export default Context;
