import React from "react";
import style from "./LoginForm.module.css";
import Input from "../input/Input";

function Form(props) {
  return (
    <div className={style["form-contains"]}>
      <h1>{props.title}</h1>
      <form className={style.form}>
        {props.children}
        <button onClick={props.submit}>submit</button>
      </form>
    </div>
  );
}

export default Form;
