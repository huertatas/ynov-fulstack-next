import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
