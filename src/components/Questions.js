import { Button } from "@mui/material";
import { parseCookies } from "nookies";
import { useState } from "react";
import { adminChange, adminCorrect } from "../lib/axios";
import { CustomInput } from "./CustomForm";

function Questions({ domain, questions, user, isChecking }) {

  const [techMarks, setTechMarks] = useState(user.marks ? user.marks.tech : 0);
  const [managementMarks, setManagementMarks] = useState(
    user.marks ? user.marks.management : 0
  );
  const [designMarks, setDesignMarks] = useState(
    user.marks ? user.marks.design : 0
  );
  const [videoMarks, setVideoMarks] = useState(
    user.marks ? user.marks.video : 0
  );
  const [techComment, setTechComment] = useState("");
  const [managementComment, setManagementComment] = useState("");
  const [designComment, setDesignComment] = useState("");
  const [videoComment, setVideoComment] = useState("");


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
          username: user.username,
          domain,
        };
        break;
      case "management":
        data = {
          username: user.username,
          domain,
        };
        break;
      case "design":
        data = {
          username: user.username,
          domain,
        };
        break;
      case "video":
        data = {
          username: user.username,
          domain,
        };
        break;
      default:
        break;
    }

    await adminCorrect(data, cookies);
  }

  function increasePosition() {
    setPosition(position + 1 < 10 ? position + 1 : 9);
  }

  function decreasePosition() {
    setPosition(position - 1 > -1 ? position - 1 : 0);
  }

  const submitHandler = async (domain, e) => {
    e.preventDefault();
    const cookies = parseCookies();
    let data;
    switch (domain) {
      case "tech":
        data = {
          username: user.username,
          domain,
          comment: techComment,
          mark: parseInt(techMarks),
        };
        break;
      case "management":
        data = {
          username: user.username,
          domain,
          comment: managementComment,
          mark: parseInt(managementMarks),
        };
        break;
      case "design":
        data = {
          username: user.username,
          domain,
          comment: designComment,
          mark: parseInt(designMarks),
        };
        break;
      case "video":
        data = {
          username: user.username,
          domain,
          comment: videoComment,
          mark: parseInt(videoMarks),
        };
        break;
      default:
        break;
    }

    await adminChange(data, cookies);
  };

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
          {!isChecking && (
            <button
              onClick={handleCorrectClick}
              className="text-gray-dark bg-stone-300 p-2 px-8 rounded-md"
            >
              CORRECT
            </button>
          )}
        </div>
      </div>
      {domain === "video" && (
        <div>
          <p className="my-4">Comments: </p>
          {user.comments.video.map((comment, i) => (
            <p className="my-4" key={i}>{comment.comment} ~ {comment.author}</p>
          ))}
          <form
            onSubmit={(e) => submitHandler("video", e)}
            className="flex flex-col gap-2"
          >
            <CustomInput
              type="number"
              value={videoMarks}
              setValue={setVideoMarks}
              label="Marks"
            />
            <CustomInput
              type="text"
              value={videoComment}
              setValue={setVideoComment}
              label="Comments"
            />
            <Button type="submit">submit</Button>
          </form>
        </div>
      )}
      {domain === "tech" && (
        <div>
          <p className="my-4">Comments: </p>
          {user.comments.tech.map((comment, i) => (
            <p className="my-4" key={i}>{comment.comment} ~ {comment.author}</p>
          ))}
          <form
            onSubmit={(e) => submitHandler("tech", e)}
            className="flex flex-col gap-2"
          >
            <CustomInput
              type="number"
              value={techMarks}
              setValue={setTechMarks}
              label="Marks"
            />
            <CustomInput
              type="text"
              value={techComment}
              setValue={setTechComment}
              label="Comments"
            />
            <Button type="submit">submit</Button>
          </form>
        </div>
      )}
      {domain === "management" && (
        <div>
          <p className="my-4">Comments: </p>
          {user.comments.management.map((comment, i) => (
            <p className="my-4" key={i}>{comment.comment} ~ {comment.author}</p>
          ))}
          <form
            onSubmit={(e) => submitHandler("management", e)}
            className="flex flex-col gap-2"
          >
            <CustomInput
              type="number"
              value={managementMarks}
              setValue={setManagementMarks}
              label="Marks"
            />
            <CustomInput
              type="text"
              value={managementComment}
              setValue={setManagementComment}
              label="Comments"
            />
            <Button type="submit">submit</Button>
          </form>
        </div>
      )}
      {domain === "design" && (
        <div>
          <p className="my-4">Comments: </p>
          {user.comments.design.map((comment, i) => (
            <p className="my-4" key={i}>{comment.comment} ~ {comment.author}</p>
          ))}
          <form
            onSubmit={(e) => submitHandler("design", e)}
            className="flex flex-col gap-2"
          >
            <CustomInput
              type="number"
              value={designMarks}
              setValue={setDesignMarks}
              label="Marks"
            />
            <CustomInput
              type="text"
              value={designComment}
              setValue={setDesignComment}
              label="Comments"
            />
            <Button type="submit">submit</Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Questions;
