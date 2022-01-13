import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = React.createContext();

function Context(props) {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");

  const putToken = (token) => {
    localStorage.setItem("token", token);
    setUserToken(token);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
    setUserToken("");
    toast.success("deconnecté");
  };

  const putUserId = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
      const id = localStorage.getItem("userId");
      setUserId(id);
    }
  }, [userToken]);

  console.log("context");
  console.log(userToken);

  const funcUser = {
    userId,
    userToken,
    putToken,
    deleteToken,
    putUserId,
  };

  return (
    <UserContext.Provider value={funcUser}>
      {props.children}
    </UserContext.Provider>
  );
}

export default Context;
