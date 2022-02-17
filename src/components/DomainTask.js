import Image from "next/image"
import Task from "./Task"

const DomainTask = ({ domain, tasks }) => {

    return (
        <>
            <div className="flex flex-row space-x-6">
                <div>
                    <p className="font-bold text-right  text-5xl "> <span className={`text-${domain} text-3xl`}>{domain.charAt(0).toUpperCase() + domain.slice(1)}</span>
                        <br />TASKS </p>
                </div>

                <span>
                    <Image src={`/assets/${domain}check.png`} height={170} width={200} priority={true} />
                </span>
            </div>

            {tasks.map((e, index) => (
                <Task key={index} taskno={index + 1} domain={domain} subdomain={e.subDomain} question={e.question.text} />
            ))}

        </>
    )
}

export default DomainTask