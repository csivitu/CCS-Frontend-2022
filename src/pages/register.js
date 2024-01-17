import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Head from 'next/head';
import { CustomInput, CustomSelect } from '../components/CustomForm';
import { ToastContext } from '../components/ToastContext';
import L_Piece from '../../public/assets/auth_l.svg';
import R_Piece from '../../public/assets/auth_r.svg';
import { signupRequest } from '../lib/axios';
import registerFormSchema from '../lib/validation/registerFormSchema';
import { useDrag } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

const Register = () => {
    const { handleSnackOpen } = useContext(ToastContext);
    const endDate = process.env.NEXT_PUBLIC_END_DATE;
    const router = useRouter();

    const leftPos = useSpring({ x: 0, y: 0 });
    const RightPos = useSpring({ x: 0, y: 0 });

    const bindLeftPos = useDrag((params) => {
        leftPos.x.set(params.offset[0]);
        leftPos.y.set(params.offset[1]);
    });

    const bindRightPos = useDrag((params) => {
        RightPos.x.set(params.offset[0]);
        RightPos.y.set(params.offset[1]);
    });

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [phoneState, setPhoneState] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [regNo, setRegNo] = useState('');
    const [gender, setGender] = useState('');

    const optionsForGender = [
        { name: 'Male', value: 'M' },
        { name: 'Female', value: 'F' },
        { name: 'Non Binary', value: 'NB' },
        { name: 'Other', value: 'O' },
        { name: 'Prefer not to disclose', value: 'P' },
    ];

    function handleResponse(res) {
        try {
            if (res === 'Too many requests, please try again later.')
                return {
                    success: false,
                    message: "Hey Buddy!, You're sending too many requests :(",
                };
            if (res.success) {
                if (res.result.success) {
                    return {
                        success: true,
                        message: 'Register successful. Please verify your Email Address to login.',
                    };
                } else {
                    return {
                        success: false,
                        message: 'Duplicate ' + res.result.duplicates.join(', '),
                    };
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function signupHandler(e) {
        e.preventDefault();
        const phone = countryCode + phoneState;
        const data = {
            name: name.trim(),
            username: username.trim(),
            password,
            passwordConfirmation,
            email: email.trim(),
            phone: phone.trim(),
            isVitian: true,
            regNo: regNo.trim(),
            gender,
        };

        const { error } = registerFormSchema.validate(data);
        if (error) {
            handleSnackOpen({
                message: error.message,
                variant: 'warning',
            });
            return;
        }

        const res = await signupRequest({ data });
        const responseState = handleResponse(res);

        if (responseState.success) {
            handleSnackOpen({
                variant: 'success',
                message: responseState.message,
            });
            router.push('/');
        } else {
            handleSnackOpen({
                variant: 'error',
                message: responseState.message,
            });
        }
    }
    if (new Date() < new Date(endDate))
        return (
            <>
                <Head>
                    <title>CSI - CCS | Register</title>
                </Head>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-dark text-gray-light p-4">
                    <div className="absolute hidden md:block left-2 md:left-5 bottom-14 md:bottom-10 animate-float_delay">
                        <animated.div
                            className=" z-50 cursor-pointer"
                            {...bindLeftPos()}
                            style={{
                                x: leftPos.x,
                                y: leftPos.y,
                            }}
                        >
                            <L_Piece className="w-32 md:w-44 lg:w-52" />
                        </animated.div>
                    </div>
                    <div className="absolute hidden md:block right-2 md:right-5 top-10 animate-float_delay">
                        <animated.div
                            className=" z-50 cursor-pointer"
                            {...bindRightPos()}
                            style={{
                                x: RightPos.x,
                                y: RightPos.y,
                            }}
                        >
                            <R_Piece className="w-32 md:w-44 lg:w-52" />
                        </animated.div>
                    </div>
                    <h1 className="text-3xl pt-4 pb-8">Register Here</h1>
                    <form
                        className="w-full md:w-1/2 flex flex-col gap-4 mb-2"
                        onSubmit={signupHandler}
                        autoComplete="off"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <CustomInput type="text" label="Name" value={name} setValue={setName} />
                            <CustomInput type="text" label="Username" value={username} setValue={setUsername} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <CustomInput type="password" label="Password" value={password} setValue={setPassword} />
                            <CustomInput
                                type="password"
                                label="Confirm Password"
                                value={passwordConfirmation}
                                setValue={setPasswordConfirmation}
                            />
                        </div>

                        <CustomInput type="email" label="Email" value={email} setValue={setEmail} />
                        <div className="flex md:flex-row gap-4">
                            <div className="w-1/5">
                                <CustomInput
                                    type="tel"
                                    label="Country Code"
                                    value={countryCode}
                                    setValue={setCountryCode}
                                />
                            </div>
                            <div className="w-4/5">
                                <CustomInput
                                    type="tel"
                                    label="Phone Number"
                                    value={phoneState}
                                    setValue={setPhoneState}
                                />
                            </div>
                        </div>
                        <CustomInput type="text" label="Registration Number" value={regNo} setValue={setRegNo} />
                        <CustomSelect label="Gender" value={gender} setValue={setGender} options={optionsForGender} />
                        <Button
                            variant="contained"
                            type="submit"
                            classes={{
                                contained: 'w-full bg-tech bg-opacity-90 hover:bg-opacity-100',
                            }}
                        >
                            Register
                        </Button>
                    </form>
                    <p>
                        Already registered?{' '}
                        <Link href="/login">
                            <a className="underline">Login</a>
                        </Link>
                    </p>
                </div>
            </>
        );
    return (
        <>
            <Head>
                <title>CSI-CCS | Register</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen gap-2">
                <animated.div
                    {...bindLeftPos()}
                    style={{
                        x: leftPos.x,
                        y: leftPos.y,
                    }}
                    className="absolute left-2 md:left-5 bottom-14 md:bottom-10 z-50 cursor-pointer"
                >
                    <L_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
                <animated.div
                    className="absolute right-2 md:right-5 top-10 cursor-pointer z-50"
                    {...bindRightPos()}
                    style={{
                        x: RightPos.x,
                        y: RightPos.y,
                    }}
                >
                    <R_Piece className="w-32 md:w-44 lg:w-52" />
                </animated.div>
                <p className="text-center text-xl">Registration for CSI CCS-2022 is closed.</p>
                <p className="text-center text-xl">The tasks will be made available to you shortly.</p>
                <p className="text-center text-xl">
                    {' '}
                    In the meantime, please keep an eye out on your email for results regarding Round 1.
                </p>
                <p className="text-center text-xl">
                    {' '}
                    You can also follow us on{' '}
                    <a
                        href="https://www.instagram.com/csivitu/"
                        target="_blank"
                        className="text-peach underline font-semibold"
                        rel="noreferrer"
                    >
                        Instagram
                    </a>{' '}
                    to stay updated.
                </p>
                <Link href="/" passHref>
                    <button className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach">
                        Home
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Register;
