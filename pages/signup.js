import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Head from "next/head";
import { signupRequest } from "../api/requests";
import { CustomInput, CustomSelect } from "../components/CustomForm";
import { validateData } from "../components/validateData";
import { ToastContext } from "../components/ToastContext";

const Signup = () => {
  const { handleSnackOpen } = useContext(ToastContext);
  const router = useRouter();

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

  function handleResponse(res) {
    console.log(res);
    if (res.success) {
      if (res.result.success) {
        return {
          success: true,
          message:
            "Signup successful. Please verify your Email Address to login.",
        };
      } else {
        return {
          success: false,
          message: "Duplicate " + res.result.duplicates.join(", "),
        };
      }
    } else {
      const message = res.map((e) => e.message).join(". ");
      return {
        success: false,
        message: message
          ? message
          : "Something went wrong. Contact our technical team for furthur assistance.",
      };
    }
  }

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

    const valid = validateData(data);

    if (!valid.success) {
      handleSnackOpen({
        message: valid.message,
        variant: "warning",
      });
      return;
    }

    const res = await signupRequest({ data: data });

    const responseState = handleResponse(res);

    if (responseState.success) {
      handleSnackOpen({
        variant: "success",
        message: responseState.message,
      });
      router.push("/");
    } else {
      handleSnackOpen({
        variant: "error",
        message: responseState.message,
      });
    }
  }

  return (
    <>
      <Head>
        <title>CCS | Signup</title>
        <meta name="keywords" content="ccs" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-dark text-white p-4">
        <h1 className="text-3xl pt-4 pb-8">Sign Up here</h1>
        <form
          className="w-full max-w-lg flex flex-col gap-4 mb-2"
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
          <Button
            variant="contained"
            type="submit"
            classes={{
              contained: "w-full bg-tech bg-opacity-90 hover:bg-opacity-100",
            }}
          >
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
