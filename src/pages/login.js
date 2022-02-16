import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CustomInput } from '../components/CustomForm';
import { loginRequest } from '../lib/axios';
import { ToastContext } from '../components/ToastContext';
import L_Piece from '../../public/assets/auth_l.svg';
import R_Piece from '../../public/assets/auth_r.svg';
import ForgotPass from '../components/ForgotPass';
import LoginFormSchema from '../lib/validation/loginFormSchema';
import { useDrag, } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

const Login = ({ query }) => {
    const endDate = process.env.NEXT_PUBLIC_END_DATE;
    const { handleSnackOpen } = useContext(ToastContext);
    const leftPos = useSpring({ x: 0, y: 0 });
    const RightPos = useSpring({ x: 0, y: 0 });

    const bindLeftPos = useDrag((params) => {
        leftPos.x.set(params.offset[0]);
        leftPos.y.set(params.offset[1]);
    })

    const bindRightPos = useDrag((params) => {
        RightPos.x.set(params.offset[0]);
        RightPos.y.set(params.offset[1]);
    })

    useEffect(() => {
        if (query) {
            if (query.verified) {
                const { verified, msg } = query;
                if (verified === 'true') {
                    handleSnackOpen({
                        message: msg,
                        variant: 'success',
                    });
                } else if (verified === 'false') {
                    handleSnackOpen({
                        message: msg,
                        variant: 'error',
                    });
                }
            } else {
                const { resetSuccess, message } = query;
                if (resetSuccess === 'true') {
                    handleSnackOpen({
                        message: message,
                        variant: 'success',
                    });
                } else if (resetSuccess === 'false') {
                    handleSnackOpen({
                        message: message,
                        variant: 'error',
                    });
                }
            }
        }
    }, []);

    const router = useRouter();

    const [usernameOrEmail, setusernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fPassState, setFPassState] = useState(false);

    async function loginHandler(e) {
        e.preventDefault();

        const data = { usernameOrEmail: usernameOrEmail.trim(), password, };

        const { error } = LoginFormSchema.validate(data);

        if (error) {
            handleSnackOpen({
                message: error.message,
                variant: 'warning',
            });
            return;
        }

        const res = await loginRequest({ data });

        try {
            if (res === 'Too many requests, please try again later.') {
                handleSnackOpen({
                    message: "Hey Buddy!, You're sending too many requests :(",
                    variant: 'error',
                });
                return;
            }
            if (res.success) {
                handleSnackOpen({
                    message: 'Logged In successfully!',
                    variant: 'success',
                });
                router.push('/');
                return;
            } else {
                if (res.message === 'Email not verified') {
                    handleSnackOpen({
                        message: 'Email Address not verified.',
                        variant: 'error',
                    });
                    return;
                }
                handleSnackOpen({
                    message: 'Invalid Login Credentials',
                    variant: 'error',
                });
            }
        } catch (e) {
            console.log(e);
            return;
        }
    }
    return (
        <>
            <Head>
                <title>CSI - CCS | Login</title>
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-dark text-gray-light px-4">
                <animated.div
                    {...bindLeftPos()}
                    style={{
                        x: leftPos.x,
                        y: leftPos.y,
                    }}
                    className="absolute hidden md:block left-2 lg:left-16 bottom-14 md:bottom-10 cursor-pointer z-50"
                >

                    <L_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
                <animated.div className="absolute hidden md:block right-2 lg:right-16 top-10 cursor-pointer z-50" {...bindRightPos()}
                    style={{
                        x: RightPos.x,
                        y: RightPos.y,
                    }}>
                    <R_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
                {fPassState ? (
                    <ForgotPass />
                ) : (
                    <form className="w-full max-w-lg flex flex-col gap-6 mb-2" onSubmit={loginHandler}>
                        <h1 className="text-4xl py-1 font-bold">Login Here</h1>
                        <CustomInput
                            label="Email or Username"
                            type="text"
                            value={usernameOrEmail}
                            setValue={setusernameOrEmail}
                        />

                        <CustomInput label="Password" type="password" value={password} setValue={setPassword} />
                        <a
                            onClick={() => {
                                setFPassState(true);
                            }}
                            className="cursor-pointer"
                        >
                            Forgot password?
                        </a>
                        <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-2 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                            Login
                        </button>
                    </form>
                )}
                {(new Date()) < (new Date(endDate)) ?
                    <div>
                        <p>
                            Don't have an account yet?
                            <Link href="/register">
                                <a className="underline">Signup</a>
                            </Link>
                        </p>
                    </div> : null}
            </div>
        </>
    );
};

export default Login;

export async function getServerSideProps({ query }) {
    if (query.verified && query.msg) {
        if (
            !['Cannot Verify', 'Wrong Verification Token', 'Already Verified', 'Successfully Verified'].includes(
                query.msg,
            )
        ) {
            return { props: { query: false } };
        }
        return {
            props: { query },
        };
    }
    if (query.resetSuccess && query.message) return { props: { query } };

    return {
        props: { query: false },
    };
}
