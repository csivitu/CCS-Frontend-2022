import { parseCookies } from "nookies";
import { useState } from "react";
import { adminCorrect } from "../lib/axios";

function Questions({ domain, questions, username, isChecking }) {
  questions = questions.map((ques) => ({
    quesId: ques.quesId.quesId,
    question: ques.quesId.question,
    answer: ques.answer,
  }));
  const [position, setPosition] = useState(0);

  async function handleCorrectClick(e) {
    e.preventDefault();
    const cookies = parseCookies();
    let data;
    switch (domain) {
      case "tech":
        data = {
          username,
          domain,
        };
        break;
      case "management":
        data = {
          username,
          domain,
        };
        break;
      case "design":
        data = {
          username,
          domain,
        };
        break;
      case "video":
        data = {
          username,
          domain,
        };
        break;
      default:
        break;
    }

    const res = await adminCorrect(data, cookies);
    console.log(res);
  }

  function increasePosition() {
    setPosition(position + 1 < 10 ? position + 1 : 9);
  }

  function decreasePosition() {
    setPosition(position - 1 > -1 ? position - 1 : 0);
  }

  return (
    <div className="w-4/5 max-w-4xl flex flex-col content-center justify-items-center">
      <div className="flex flex-row items-center pt-20">
        <div className={`text-base`} style={{ color: `var(--${domain})` }}>
          Domain: <b className="uppercase">{domain}</b>
        </div>
      </div>
      {questions.map((q, i) => {
        return (
          i === position && (
            <div key={i}>
              <div className="flex flex-col md:flex-row gap-2 pt-10">
                <div className="font-bold grow">
                  {" "}
                  QUESTION {i + 1}
                  <br />
                  <p className="font-light"> {q.question.text} </p>
                  {q.question.links.map((link) => {
                    return (
                      <>
                        <a href={link} rel="noreferrer" target="_blank">
                          {link}
                        </a>{" "}
                        <br />
                      </>
                    );
                  })}
                </div>
                {q.question.img[0] && (
                  <div>
                    <img
                      src={q.question.img[0]}
                      alt="Question image"
                      className="aspect-square"
                      style={{ width: "100%", maxWidth: "300px" }}
                    ></img>
                  </div>
                )}
              </div>
              <div className="flex flex-row font-bold pt-10 pb-4">
                YOUR ANSWER
              </div>
              <p className="whitespace-pre-wrap">{q.answer}</p>
            </div>
          )
        );
      })}
      <div className="flex flex-col md:flex-row items-center rounded-md py-5 gap-4 justify-between">
        <div className="flex flex-row rounded-md gap-4">
          <button
            onClick={decreasePosition}
            className="text-gray-dark bg-stone-300 p-2 px-8 rounded-md"
          >
            PREVIOUS
          </button>
          <button
            onClick={increasePosition}
            className="text-gray-dark bg-stone-300 p-2 px-8 rounded-md"
          >
            NEXT
          </button>
          {!isChecking ? (
            <button
              onClick={handleCorrectClick}
              className="text-gray-dark bg-stone-300 p-2 px-8 rounded-md"
            >
              CORRECT
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Questions;
