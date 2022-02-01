import Clock from '../public/assets/clock.svg';
import { useState } from 'react';
import Countdown from 'react-countdown';

function Quiz({ domain, questions }) {
    const [answers, setAnswers] = useState(questions.map(e => { return { quesId: e.quesId, answer: '' } }));
    const [position, setPosition] = useState(0);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            return <h1>Completed</h1>;
        } else {
            return (
                <p className='font-extralight whitespace-nowrap'>{minutes}:{seconds}</p>
            )
        }
    };

    function updateAnswer(id, answer) {
        let tempAnswers = [...answers];
        // console.log(id, answer)
        const index = tempAnswers.findIndex(element => element.quesId === id);
        tempAnswers[index].answer = answer;
        setAnswers(tempAnswers);
    }

    function increasePosition() {
        setPosition(position + 1 < 10 ? position + 1 : 9)
    }

    function decreasePosition() {
        setPosition(position - 1 > -1 ? position - 1 : 0)
    }

    return (
        <div className="w-4/5 max-w-4xl flex flex-col content-center justify-items-center">
            <div className="flex flex-row items-center pt-20">
                <div className={`text-base`} style={{ color: `var(--${domain})` }}>Domain: <b className="uppercase">{domain}</b></div>
                <div className={`ml-auto text-xl`} style={{ color: `var(--${domain})` }}> <Clock /></div>
                <div className="pl-5"><Countdown
                    date={new Date("Feb 12, 2022 00:00:00")}
                    renderer={renderer}
                /></div>
            </div>
            {questions.map((q, i) => {
                return i === position && <>
                    <div className="flex flex-row pt-10">
                        <div className="font-bold"> QUESTION {i + 1}<br />
                            <p className="font-light"> {q.question.text} </p>
                            {q.question.links.map((link, i) => {
                                return <>
                                    <a href={link} target="_blank">{link}</a> <br />
                                </>
                            })}
                        </div>
                        {q.question.img[0] && <div><img src={q.question.img[0]} alt="Question image" className="aspect-square" style={{ width: '400px' }}></img></div>}
                    </div>
                    <div className="flex flex-row font-bold pt-10 pb-4">
                        YOUR ANSWER
                    </div>
                    <textarea value={answers[i].answer} onChange={e => updateAnswer(q.quesId, e.target.value)} className={`h-96 bg-opacity-20 rounded-md p-10 outline-none`} style={{ backgroundColor: `var(--${domain}-bg)` }}>
                    </textarea>
                </>
            })}
            <div className="flex flex-col md:flex-row items-center rounded-md py-5 gap-4 justify-between">
                <div className="flex flex-row rounded-md gap-4">
                    <button onClick={decreasePosition} className="text-black bg-stone-300 p-2 px-8 rounded-md">PREVIOUS</button>
                    <button onClick={increasePosition} className="text-black bg-stone-300 p-2 px-8 rounded-md">NEXT</button>
                </div>
                <button className={` bg-${domain} p-3 px-8 rounded-md`}>SUBMIT</button>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 justify-items-center self-center">
                {answers.map((a, i) => {
                    return <button onClick={() => setPosition(i)} className="text-black rounded-full w-10 h-10 m-1" style={{
                        backgroundColor: a.answer ? `var(--${domain})` : `var(--peach)`,
                        border: i === position ? `4px solid var(--${domain})` : "none"
                    }}>{i + 1}</button>
                })}
            </div>
        </div>
    );
}

export default Quiz;