import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../context/Context";
import Form from "../../components/login/Form";
import Input from "../../components/input/Input";
import toast from "react-hot-toast";
import withAuth from "../../components/HEC/withAuth";

function ProfilePage() {
  const userCtx = useContext(UserContext);
  const [userProfile, setUserProfile] = useState("");

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = {
      lastName: lastName,
      firstName: firstName,
      email: mail,
      password: password,
    };

    fetch(`${process.env.API_URL}api/v1/update/${userCtx.userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: `${userCtx.userToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        res.json().then((data) => {
          toast.success(`profil mis à jours`);
          setUserProfile(data);
        });
      })
      .catch((e) => e.message);
  };

  useEffect(() => {
    if (userCtx.userToken) {
      fetch(`${process.env.API_URL}api/v1/user/${userCtx.userId}`, {
        headers: {
          authorization: `${userCtx.userToken}`,
        },
      })
        .then((res) => {
          res.json().then((data) => {
            setUserProfile(data);
          });
        })
        .catch((e) => e.message);
    }
  }, [userCtx]);

  return (
    <>
      <Form
        firstLabel="mail"
        secondLabel="password"
        title="Mofier mes informations"
        submit={handleUpdate}
      >
        <Input
          type="text"
          isRequired={true}
          label="first name"
          value={firstName}
          onChange={onChangeFirstName}
          placeholder={userProfile.firstName}
        />
        <Input
          type="text"
          isRequired={true}
          label="last name"
          value={lastName}
          onChange={onChangeLastName}
          placeholder={userProfile.lastName}
        />
        <Input
          type="text"
          isRequired={true}
          label="mail"
          value={mail}
          onChange={onChangeMail}
          placeholder={userProfile.email}
        />
        <Input
          type="password"
          isRequired={true}
          label="password"
          value={password}
          onChange={onChangePassword}
        />
      </Form>
      <div>
        {userProfile &&
          `${userProfile.firstName} | ${userProfile.lastName} | ${userProfile.email} `}
      </div>
    </>
  );
}

export default withAuth(ProfilePage);
