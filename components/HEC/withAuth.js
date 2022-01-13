import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/Context";

function WithAuth(WrappedComponent) {
  return (props) => {
    const userCtx = useContext(UserContext);

    if (true) {
      return <WrappedComponent></WrappedComponent>;
    }

    return <div>not allowed</div>;
  };
}

export default WithAuth;
