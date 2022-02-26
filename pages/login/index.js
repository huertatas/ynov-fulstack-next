import React, { useState, useEffect, useContext } from "react";
import Form from "../../components/login/Form";
import Input from "../../components/input/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../../context/Context";
import toast from "react-hot-toast";

function LoginPage() {
  const router = useRouter();
  const useCtx = useContext(UserContext);

  const urlUsers = "/users/";

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeMail = (e) => {
    setMail(e.currentTarget.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleInscription = async (e) => {
    e.preventDefault();

    const body = {
      email: mail,
      password: password,
    };

    fetch(`${process.env.API_URL}api/v1${urlUsers}login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.id === undefined) {
            toast.error("profil non existant");
            return;
          }
          useCtx.putToken(data.token);
          useCtx.putUserId(data.id);
          useCtx.handleSetSubType(data.type_sub);
          router.push("/");
        });
      })
      .catch((e) => e.message);
  };

  useEffect(() => {
    const token = useCtx.userToken;

    if (token) {
      router.push("/profil");
    }
  }, [router, useCtx]);

  return (
    <>
      <Form
        firstLabel="mail"
        secondLabel="password"
        title="login"
        submit={handleInscription}
      >
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
        Vous êtes nouveau ? <Link href="/register">s&apos;inscrire</Link>
      </h4>
    </>
  );
}

export default LoginPage;
