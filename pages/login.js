import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { CustomInput, LoginToggle } from "../components/CustomForm";
import { Button } from "@mui/material";
import { loginRequest } from "../api/requests";

const Login = () => {
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

    console.log(data);

    const res = await loginRequest({ data: data });

    console.log(res);
  }
  return (
    <>
      <Head>
        <title>CCS | Login</title>
        <meta name="keywords" content="ccs" />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1> Login here</h1>
        <form
          className="w-full max-w-lg flex flex-col gap-4"
          onSubmit={loginHandler}
        >
          <LoginToggle
            value={loginOption}
            setValue={setLoginOption}
            options={["Username", "Email"]}
          />
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
          <Button variant="contained" type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div>
          <p>
            Don't have an account yet?{" "}
            <Link href="/signup">
              <a>Signup</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
