import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { CustomInput, LoginToggle } from "../components/CustomForm";
import { Button } from "@mui/material";
import { loginRequest } from "../lib/axios";
import { ToastContext } from "../components/ToastContext";
import { validateData } from "../components/validateData";
import L_Piece from "../public/assets/auth_l.svg";
import R_Piece from "../public/assets/auth_r.svg";
import { isEmpty } from "lodash";

const Login = ({ query, msg, verified }) => {
  const { handleSnackOpen } = useContext(ToastContext);
  useEffect(() => {
    if (query) {
      if (verified === 'true') {
        handleSnackOpen({
          message: msg,
          variant: "success",
        });
      } else {
        handleSnackOpen({
          message: msg,
          variant: "error",
        });
      }
    }
  });

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginOption, setLoginOption] = useState("Username");

  async function loginHandler(e) {
    e.preventDefault();

    const data =
      loginOption === "Username"
        ? { username: username, password: password }
        : { email: email, password: password };

    const valid = validateData(data);

    if (!valid.success) {
      handleSnackOpen({
        message: valid.message,
        variant: "warning",
      });
      return;
    }

    const res = await loginRequest({ data: data });

    if (res.success) {
      handleSnackOpen({
        message: "Logged In successfully!",
        variant: "success",
      });
      router.push("/");
    } else {
      if (res.message === "Email not verified") {
        handleSnackOpen({
          message: "Email Address not verified.",
          variant: "error",
        });
        return;
      }
      loginOption === "Username"
        ? handleSnackOpen({
          message: "Invalid username or password.",
          variant: "error",
        })
        : handleSnackOpen({
          message: "Invalid email or password.",
          variant: "error",
        });
    }
  }
  return (
    <>
      <Head>
        <title>CCS | Login</title>
        <meta name="keywords" content="ccs" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-dark text-gray-light px-4">
        <div className="absolute hidden md:block left-2 lg:left-16 bottom-14 md:bottom-10">
          <L_Piece className="w-32 md:w-44 lg:w-52" />
        </div>
        <div className="absolute hidden md:block right-2 lg:right-16 top-10">
          <R_Piece className="w-32 md:w-44 lg:w-52" />
        </div>
        <form
          className="w-full max-w-lg flex flex-col gap-4 mb-2"
          onSubmit={loginHandler}
        >
          <LoginToggle
            value={loginOption}
            setValue={setLoginOption}
            options={["Username", "Email"]}
          />
          <h1 className="text-3xl py-1 font-bold">Login Here</h1>
          {loginOption === "Username" && (
            <CustomInput
              label="Username"
              type="text"
              value={username}
              setValue={setUsername}
            />
          )}
          {loginOption === "Email" && (
            <CustomInput
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />
          )}
          <CustomInput
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <a>Forgot password?</a>
          <Button
            variant="contained"
            type="submit"
            classes={{
              contained: "w-full bg-tech bg-opacity-90 hover:bg-opacity-100",
            }}
          >
            Login
          </Button>
        </form>
        <div>
          <p>
            {"Don't have an account yet? "}
            <Link href="/register">
              <a className="underline">Signup</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

export async function getServerSideProps({ query }) {
  if (isEmpty(query))
    return {
      props: { query: false }
    }
  const { verified, msg } = query
  const msgArr = ['Cannot Verify', 'Wrong Verification Token', 'Already Verified', 'Successfully Verified']
  if (!msgArr.includes(msg))
    return {
      props: { query: false }
    }

  return {
    props: { query: true, verified, msg }
  }
}