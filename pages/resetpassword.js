import Head from "next/head";
import L_Piece from "../public/assets/auth_l.svg";
import R_Piece from "../public/assets/auth_r.svg";
import { Button } from "@mui/material";
import { CustomInput } from "../components/CustomForm";
import { useContext, useState } from "react";
import { isEmpty } from "lodash";
import { resetPasswordRequest } from "../lib/axios";
import { ToastContext } from "../components/ToastContext";
import { useRouter } from "next/router";

const Resetpassword = ({ id, token }) => {
    const router = useRouter()

    const { handleSnackOpen } = useContext(ToastContext);

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const handleSubmit = async () => {
        if (id && token) {
            const { success, message } = await resetPasswordRequest({ id, token, password, passwordConfirmation })
            router.push(`/login?resetSuccess=${success}&message=${message}`)
        }
    }
    return (
        <>
            <Head>
                <title>CCS | Reset Password</title>
                <meta name="keywords" content="ccs" />
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-dark text-gray-light px-4">
                <div className="absolute hidden md:block left-2 lg:left-16 bottom-14 md:bottom-10">
                    <L_Piece className="w-32 md:w-44 lg:w-52" />
                </div>
                <div className="absolute hidden md:block right-2 lg:right-16 top-10">
                    <R_Piece className="w-32 md:w-44 lg:w-52" />
                </div>
                <div className="w-full max-w-lg flex flex-col gap-4 mb-2">
                    <h1 className="text-3xl py-1 font-bold">Reset Password</h1>
                    <CustomInput
                        type="password"
                        label="New Password"
                        value={password}
                        setValue={setPassword}
                    />
                    <CustomInput
                        type="password"
                        label="Confirm Password"
                        value={passwordConfirmation}
                        setValue={setPasswordConfirmation}
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
            </div>
        </>
    )
};

export default Resetpassword;

export async function getServerSideProps({ query }) {
    if (isEmpty(query)) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    const { id = null, token = null } = query
    return {
        props: { id, token }
    }
}

