import React from "react";

function Input(props) {
  return (
    <>
      <label>{props.label}</label>
      <input
        type={props.type}
        required={props.isRequired}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      ></input>
    </>
  );
}

export default Input;
