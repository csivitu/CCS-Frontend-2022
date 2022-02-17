import Joi from "joi";
import { parseCookies } from "nookies";
import { useContext, useRef, useState } from "react";
import { submitTasks } from "../lib/axios";
import { ToastContext } from "./ToastContext";

const Task = ({ taskno, domain, subdomain, question }) => {
    const [inputValue, setinputValue] = useState();
    const { handleSnackOpen } = useContext(ToastContext);
    const inputRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = Joi.string().uri().validate(inputRef.value);
        if (error) {
            handleSnackOpen({
                message: 'Invalid URL',
                variant: 'error',
            });
            return;
        }

        const cookies = parseCookies();


        const res = await submitTasks(cookies, subdomain, inputRef.value)
        if (res.success) {
            handleSnackOpen({
                message: `URL for ${subdomain} has been submitted!`,
                variant: 'success',
            });
            return
        }

        handleSnackOpen({
            message: res.message,
            variant: 'warn'
        })



    }
    return (

        <div className="flex flex-col font-bold w-3/4 space-y-4 ">
            <p>TASK {taskno} <span className={`text-${domain}`}>{subdomain}</span></p>
            <p className="font-normal">{question}</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row ">
                    <div className="relative z-0 mb-6 w-full">
                        <input type="text" name="floating_email" className={`text-peach block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-${domain} peer`} placeholder=" " ref={e => (inputRef = e)} />
                        <label for="floating_email" className={`absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-${domain}  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Paste link to task</label>

                    </div>
                    <button type="submit" className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-3 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach" >SUBMIT</button>
                </div>
            </form>
        </div >
    )
}

export default Task