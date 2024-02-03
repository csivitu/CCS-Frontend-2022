import { useState } from 'react';
import Image from 'next/image';
import Task from './Task';

const DomainTask = ({ domain, tasks }) => {
    const [taskIndex, setTaskIndex] = useState(0);
    return (
        <>
            <div className="flex flex-row gap-6 items-center mx-10">
                <div className="font-bold text-right">
                    <span className={`text-${domain} text-3xl md:text-5xl`}>
                        {domain.charAt(0).toUpperCase() + domain.slice(1)}
                    </span>
                    <br />
                    <span className="text-4xl md:text-7xl">TASKS</span>
                </div>

                <Image src={`/assets/${domain}check.png`} alt="domain" height={170} width={200} priority={true} />
            </div>
            <div className="h-fit w-11/12 md:w-2/3 mb-6">
                <i className="font-thin">
                    <b className="font-bold">Note:</b> You only have to submit tasks for the subdomains you wish to
                    apply for. The completion of these tasks is optional. Our objective is to see your initiative and
                    effort put in to learn something when you have been provided with appropriate resources. Please do
                    not be intimidated and/or demotivated if you find the tasks challenging. Also do note that, you will
                    be asked about your submitted task during the interview.
                </i>
            </div>
            <div className="flex justify-center scale-75 md:scale-100">
                {tasks.map((a, i) => {
                    return (
                        <button
                            key={`pos${i}`}
                            onClick={() => setTaskIndex(i)}
                            className="rounded-full w-10 h-10 m-1"
                            style={{
                                backgroundColor: a.answer ? `var(--${domain})` : `var(--peach)`,
                                color: a.answer ? `var(--peach)` : `var(--dark-gray)`,
                                border: i === taskIndex ? `4px solid var(--${domain})` : 'none',
                            }}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>

            {tasks.map((e, index) => (
                <Task
                    key={index}
                    taskno={index + 1}
                    domain={domain}
                    subdomain={e.subDomain}
                    question={e.question.text}
                    link={e.link}
                    currentActiveTask={taskIndex}
                />
            ))}

            {!tasks && <p>Didnt qualify for round 2.</p>}
        </>
    );
};

export default DomainTask;
