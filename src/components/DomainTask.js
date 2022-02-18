import Image from 'next/image';
import Task from './Task';

const DomainTask = ({ domain, tasks }) => {
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

            {tasks.map((e, index) => (
                <Task
                    key={index}
                    taskno={index + 1}
                    domain={domain}
                    subdomain={e.subDomain}
                    question={e.question.text}
                    link={e.link}
                />
            ))}

            {!tasks && <p>Didnt qualify for round 2.</p>}
        </>
    );
};

export default DomainTask;
