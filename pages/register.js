import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Head from "next/head";
import { CustomInput, CustomSelect } from "../components/CustomForm";
import { validateData } from "../components/validateData";
import { ToastContext } from "../components/ToastContext";
import L_Piece from "../public/assets/auth_l.svg";
import R_Piece from "../public/assets/auth_r.svg";
import { signupRequest } from "../lib/axios";


const Register = () => {
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
    if (res.success) {
      if (res.result.success) {
        return {
          success: true,
          message:
            "Register successful. Please verify your Email Address to login.",
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

    const res = await signupRequest({ data });
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
        <title>CSI-CCS | Register</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-dark text-gray-light p-4">
        <div className="absolute hidden md:block left-2 md:left-5 bottom-14 md:bottom-10">
          <L_Piece className="w-32 md:w-44 lg:w-52" />
        </div>
        <div className="absolute hidden md:block right-2 md:right-5 top-10">
          <R_Piece className="w-32 md:w-44 lg:w-52" />
        </div>
        <h1 className="text-3xl pt-4 pb-8">Register Here</h1>
        <form
          className="w-full md:w-1/2 flex flex-col gap-4 mb-2"
          onSubmit={signupHandler}
          autoComplete="off"
        >
          <div className="flex flex-col md:flex-row gap-4">
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
          </div>
          <div className="flex flex-col md:flex-row gap-4">
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
          </div>

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
            Register
          </Button>
        </form>
        <p>
          Already registered?{" "}
          <Link href="/login">
            <a className="underline">Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;

