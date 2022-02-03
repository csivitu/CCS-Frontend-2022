import { Button } from "@mui/material";
import nookies from "nookies";
import { CustomInput } from "../../../components/CustomForm";
import Questions from "../../../components/Questions";
import { adminGetUserRequest } from "../../../lib/axios";

const User = ({ result: { user, questions } }) => {
  const submitHandler = async() => {

  }
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
      <form onSubmit={submitHandler} className="flex flex-col gap-2">
        <label className="text-xl mx-3">Marks</label>
        <input className="text-slate-900 p-2 px-4 rounded-md" type="number"></input>
        <label className="text-xl mx-3 mt-5">comments</label>
        <textarea className="text-slate-900 p-2 px-4 rounded-md"></textarea>
        <Button type="submit">submit</Button>
      </form>
      <p className="text-4xl my-4">MANAGEMENT</p>
      <form onSubmit={submitHandler} className="flex flex-col gap-2">
        <label className="text-xl mx-3">Marks</label>
        <input className="text-slate-900 p-2 px-4 rounded-md" type="number"></input>
        <label className="text-xl mx-3 mt-5">comments</label>
        <textarea className="text-slate-900 p-2 px-4 rounded-md"></textarea>
        <Button type="submit">submit</Button>
      </form>
      <p className="text-4xl my-4">DESIGN</p>
      <form onSubmit={submitHandler} className="flex flex-col gap-2">
        <label className="text-xl mx-3">Marks</label>
        <input className="text-slate-900 p-2 px-4 rounded-md" type="number"></input>
        <label className="text-xl mx-3 mt-5">comments</label>
        <textarea className="text-slate-900 p-2 px-4 rounded-md"></textarea>
        <Button type="submit">submit</Button>
      </form>
      <p className="text-4xl my-4">VIDEO</p>
      <form onSubmit={submitHandler} className="flex flex-col gap-2">
        <label className="text-xl mx-3">Marks</label>
        <input className="text-slate-900 p-2 px-4 rounded-md" type="number"></input>
        <label className="text-xl mx-3 mt-5">comments</label>
        <textarea className="text-slate-900 p-2 px-4 rounded-md"></textarea>
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
