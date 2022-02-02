import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { forgotPassRequest } from "../lib/axios";
import { CustomInput } from "./CustomForm";
import { ToastContext } from "./ToastContext";

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const { handleSnackOpen } = useContext(ToastContext);

    const handleSubmit = async () => {
        const { success, message } = await forgotPassRequest({ email })
        if (success) {
            handleSnackOpen({
                message: message,
                variant: "success",
            });
        }
    }

    return (
        <>
            <div className="w-full max-w-lg flex flex-col gap-4 mb-2">
                <h1 className="text-3xl py-1 font-bold">Forgot Password</h1>
                <CustomInput
                    label="Email"
                    type="email"
                    value={email}
                    setValue={setEmail}
                />
                <Button
                    variant="contained"
                    type="submit"
                    classes={{
                        contained: "w-full bg-tech bg-opacity-90 hover:bg-opacity-100",
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </>)
};

export default ForgotPass;
