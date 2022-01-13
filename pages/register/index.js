import React, { useState, useEffect, useContext } from "react";
import Form from "../../components/login/Form";
import Input from "../../components/input/Input";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../../context/Context";
import toast from "react-hot-toast";

function RegisterPage() {
  const router = useRouter();
  const useCtx = useContext(UserContext);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onChangeMail = (e) => {
    setMail(e.currentTarget.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.currentTarget.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.currentTarget.value);
  };

  const handleInscription = async (e) => {
    e.preventDefault();

    const body = {
      lastName: lastName,
      firstName: firstName,
      email: mail,
      password: password,
      isAdmin: false,
    };

    fetch(`${process.env.API_URL}api/v1/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        res.json().then((data) => {
          // console.log("id--");
          // console.log(data.id);
          // localStorage.setItem("token", data.token);
          useCtx.putToken(data.token);
          useCtx.putUserId(data.id);
          router.push("/profil");
          toast.success("connecté");
        });
      })
      .catch((e) => e.message);
  };

  useEffect(() => {
    const token = useCtx.userToken;

    if (token) {
      router.push("/profil");
    }
  }, []);

  return (
    <>
      <Form
        firstLabel="mail"
        secondLabel="password"
        title="register"
        submit={handleInscription}
      >
        <Input
          type="text"
          isRequired={true}
          label="first name"
          value={firstName}
          onChange={onChangeFirstName}
        />
        <Input
          type="text"
          isRequired={true}
          label="last name"
          value={lastName}
          onChange={onChangeLastName}
        />
        <Input
          type="text"
          isRequired={true}
          label="mail"
          value={mail}
          onChange={onChangeMail}
        />
        <Input
          type="password"
          isRequired={true}
          label="password"
          value={password}
          onChange={onChangePassword}
        />
      </Form>
      <h4>
        Vous êtes déjà inscris ? <Link href="/login">se connecter</Link>
      </h4>
    </>
  );
}

export default RegisterPage;
