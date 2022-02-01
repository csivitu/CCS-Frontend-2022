import Quiz from '../../components/Quiz';

function video() {
    return (
        <div className="flex flex-nowrap flex-row justify-center relative">
            <Quiz domain="video" questions={questions}/>
            <div className="w-64 absolute left-0 pt-20 hidden 2xl:block "><img src="/assets/quiz_video.png" alt="" /></div>
        </div>
    );
}

const questions = [
    {
        quesId: 101,
        question: {
            text: "hi",
            img: [],
            links: [],
        }
    },
    {
        quesId: 102,
        question: {
            text: "bye",
            img: [],
            links: [],
        }
    },
    {
        quesId: 103,
        question: {
            text: "toxic",
            img: [],
            links: [],
        }
    },
    {
        quesId: 104,
        question: {
            text: "ex",
            img: [],
            links: [],
        }
    },
    {
        quesId: 105,
        question: {
            text: "hi",
            img: [],
            links: [],
        }
    },
    {
        quesId: 106,
        question: {
            text: "hi",
            img: [],
            links: [],
        }
    },
    {
        quesId: 107,
        question: {
            text: "hi",
            img: [],
            links: [],
        }
    },
    {
        quesId: 108,
        question: {
            text: "hi",
            img: [],
            links: [],
        }
    },
    {
        quesId: 109,
        question: {
            text: "hi",
            img: [],
            links: [],
        }
    },
    {
        quesId: 110,
        question: {
            text: "hi",
            img: [],
            links: [],
        }
    }
]

export default video;