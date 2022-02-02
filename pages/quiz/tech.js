/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import Quiz from "../../components/Quiz";
import { getQuestions, startQuiz } from "../../lib/axios";

function tech({ success, message, questions, endTime }) {
  const router = useRouter();

  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center">Something went wrong!</p>
        <p className="text-center font-bold">Error Message: {message}</p>
        <Link href="/" passHref>
          <button className="px-4 py-2 bg-peach text-gray-dark m-4">
            Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-nowrap flex-row justify-center relative">
      <Quiz domain="tech" questions={questions} endTime={endTime} />
      <div className="w-64 absolute left-0 pt-20 hidden 2xl:block ">
        <img src="/assets/quiz_tech.png" alt="" />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const res = await startQuiz({ ctx, domain: "Tech" });
  const { success, message, result } = await getQuestions({
    ctx,
    domain: "Tech",
  });
  console.log(success, message, result);
  if (success) {
    return {
      props: {
        success: true,
        questions: result.questions,
        endTime: result.endTime,
      }, // will be passed to the page component as props
    };
  } else {
    return {
      props: { success: false, message: message },
    };
  }
}

export default tech;
