import { useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import Head from "next/head";
import { signupRequest } from "../api/requests";
import { CustomInput, CustomSelect } from "../components/CustomForm";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isVitian, setIsVitian] = useState(true);
  const [regNo, setRegNo] = useState("");
  const [gender, setGender] = useState("");

  const optionsForIsVitian = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];

  const optionsForGender = [
    { name: "Male", value: "M" },
    { name: "Female", value: "F" },
  ];

  async function signupHandler(e) {
    e.preventDefault();

    const data = {
      name,
      username,
      password,
      passwordConfirmation,
      email,
      phone,
      isVitian,
      regNo,
      gender,
    };

    console.log(data);

    const res = await signupRequest({ data: data });

    return res;
  }

  return (
    <>
      <Head>
        <title>CCS | Signup</title>
        <meta name="keywords" content="ccs" />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1> Sign Up here</h1>
        <form
          className="w-full max-w-lg flex flex-col gap-2"
          onSubmit={signupHandler}
          autoComplete="off"
        >
          <CustomInput
            type="text"
            label="Name"
            value={name}
            setValue={setName}
          />
          <CustomInput
            type="text"
            label="Username"
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
          <CustomInput
            type="password"
            label="Confirm Password"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
          />
          <CustomInput
            type="email"
            label="Email"
            value={email}
            setValue={setEmail}
          />
          <CustomInput
            type="tel"
            label="Phone Number"
            value={phone}
            setValue={setPhone}
          />
          <CustomSelect
            label="Is Vitian?"
            value={isVitian}
            setValue={setIsVitian}
            options={optionsForIsVitian}
            disabled={true}
          />
          <CustomInput
            type="text"
            label="Registration Number"
            value={regNo}
            setValue={setRegNo}
            disabled={!isVitian}
          />
          <CustomSelect
            label="Gender"
            value={gender}
            setValue={setGender}
            options={optionsForGender}
          />
          <Button variant="contained" type="submit" className="w-full">
            Signup
          </Button>
        </form>
        <p>
          Already registered?{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
