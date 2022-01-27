import { useState } from "react";
import Head from "next/head";
import { CustomInput } from "../components/CustomForm";
import { Button } from "@mui/material";
import { loginRequest } from "../api/requests";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler(e) {
    e.preventDefault();

    const data = { username: username, password: password };

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
          className="w-full max-w-lg flex flex-col gap-2"
          onSubmit={loginHandler}
        >
          <CustomInput
            label="Username/Email"
            type="text"
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <Button variant="contained" type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p>Forgot password?</p>
      </div>
    </>
  );
};

export default Login;
