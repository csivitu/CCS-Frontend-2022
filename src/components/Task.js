import Joi from 'joi';
import { parseCookies } from 'nookies';
import { useContext, useRef, useState } from 'react';
import { submitTasks } from '../lib/axios';
import { ToastContext } from './ToastContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRouter } from 'next/router';

const Task = ({ taskno, domain, subdomain, question, link, admin = false }) => {
    let taskValue = link;
    const [editing, setEditing] = useState(false);
    const router = useRouter();

    function startEdit() {
        setEditing(true);
    }

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

        const res = await submitTasks(cookies, subdomain, inputRef.value);
        if (res.success) {
            handleSnackOpen({
                message: `URL for ${subdomain} has been submitted!`,
                variant: 'success',
            });
            setEditing(false);
            router.reload();
            return;
        }

        handleSnackOpen({
            message: res.message,
            variant: 'warn',
        });
    };
    return (
        <div className="flex flex-col font-bold gap-4 h-fit w-11/12 md:w-2/3 mb-6">
            <p className="color-white uppercase tracking-wider">
                TASK {taskno}{' '}
                <span style={{ color: `var(--${domain})` }}>{subdomain === 'UI/UX' ? 'DESIGN' : subdomain}</span>
            </p>

            <div id="markdown" className="font-normal text-gray-light w-full p-2 border-2 border-peach">
                <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>{question}</ReactMarkdown>
            </div>
            <p>Submission</p>
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-2">
                        <div className="relative z-0 w-full">
                            <label
                                htmlFor="floating_email"
                                className={`absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-${domain}  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                                Paste link to task
                            </label>
                            <input
                                type="text"
                                name="floating_email"
                                className={`text-peach block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-${domain} peer`}
                                placeholder={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                                ref={(e) => (inputRef = e)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-2 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach"
                        >
                            SUBMIT
                        </button>
                        <button className="text-xl" onClick={() => setEditing(false)}>
                            ×
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="relative z-0 w-full flex gap-2 items-center">
                        {taskValue ? (
                            <a
                                className="grow overflow-hidden text-ellipsis max-w-full text-green-200"
                                href={taskValue}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {taskValue}
                            </a>
                        ) : (
                            <i className="grow font-thin">Task not submitted yet!</i>
                        )}
                        {!admin && (
                            <button
                                className="cursor-pointer transition text-md lg:text-xl ease-linear py-1 lg:py-2 px-2 lg:px-5 rounded text-black font-semibold bg-peach hover:bg-transparent hover:text-peach border-2 border-peach"
                                onClick={startEdit}
                            >
                                EDIT
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Task;
