import { Button } from "@mui/material";
import nookies, { parseCookies } from "nookies";
import { useState } from "react";
import { CustomInput } from "../../../components/CustomForm";
import Questions from "../../../components/Questions";
import { adminChange, adminGetUserRequest } from "../../../lib/axios";

const User = ({ result: { user, questions } }) => {
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

  const submitHandler = async (domain, e) => {
    e.preventDefault();
    const cookies = parseCookies();
    let data;
    switch (domain) {
      case "tech":
        data = {
          username: user.userId.username,
          domain,
          comment: techComment,
          mark: parseInt(techMarks),
        };
        break;
      case "management":
        data = {
          username: user.userId.username,
          domain,
          comment: managementComment,
          mark: parseInt(managementMarks),
        };
        break;
      case "design":
        data = {
          username: user.userId.username,
          domain,
          comment: designComment,
          mark: parseInt(designMarks),
        };
        break;
      case "video":
        data = {
          username: user.userId.username,
          domain,
          comment: videoComment,
          mark: parseInt(videoMarks),
        };
        break;
      default:
        break;
    }

    const res = await adminChange(data, cookies);
    console.log(res);
  };
  return (
    <div className="flex flex-col justify-center items-center m-6">
      <div>
        <p>username: {user.userId.username}</p>
        <p>name: {user.userId.name}</p>
        <p>mobile: {user.userId.phone}</p>
        <p>email: {user.userId.email}</p>
        <p>gender: {user.userId.gender}</p>
        <p>tech round: {user.techRound}</p>
        <p>management round: {user.techRound}</p>
        <p>design round: {user.techRound}</p>
        <p>video round: {user.techRound}</p>
      </div>
      {user.domainsAttempted.map((dom) => {
        let ques;
        switch (dom.domain) {
          case "tech":
            ques = user.techAttempted.map((que) => ({
              quesId:
                questions[questions.map((q) => q._id).indexOf(que.quesId)],
              answer: que.answer,
            }));
            break;
          case "management":
            ques = user.managementAttempted.map((que) => ({
              quesId:
                questions[questions.map((q) => q._id).indexOf(que.quesId)],
              answer: que.answer,
            }));
            break;
          case "design":
            ques = user.designAttempted.map((que) => ({
              quesId:
                questions[questions.map((q) => q._id).indexOf(que.quesId)],
              answer: que.answer,
            }));
            break;
          case "video":
            ques = user.videoAttempted.map((que) => ({
              quesId:
                questions[questions.map((q) => q._id).indexOf(que.quesId)],
              answer: que.answer,
            }));
            break;
          default:
            break;
        }
        return (
          <Questions domain={dom.domain} questions={ques} key={dom.domain} />
        );
      })}
      <p className="text-4xl my-4">TECH</p>

      <p className="my-4">Comments: </p>
      {user.comments.tech.map((comment, i) => (
        <p key={i}>{comment}</p>
      ))}

      <form
        onSubmit={(e) => submitHandler("tech", e)}
        className="flex flex-col gap-2 mt-5"
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
      <p className="text-4xl my-4">MANAGEMENT</p>

      <p className="my-4">Comments: </p>
      {user.comments.management.map((comment, i) => (
        <p key={i}>{comment}</p>
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
      <p className="text-4xl my-4">DESIGN</p>

      <p className="my-4">Comments: </p>
      {user.comments.design.map((comment, i) => (
        <p key={i}>{comment}</p>
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
      <p className="text-4xl my-4">VIDEO</p>

      <p className="my-4">Comments: </p>
      {user.comments.video.map((comment, i) => (
        <p key={i}>{comment}</p>
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
  );
};

export default User;

export async function getServerSideProps(ctx) {
  // Parse
  const cookies = nookies.get(ctx);
  const {
    query: { user },
  } = ctx;
  const { success, result } = await adminGetUserRequest(cookies, user);
  if (!success) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return { props: { result } };
}
