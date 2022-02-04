import Image from "next/image";
import { parseCookies } from "nookies";
import Quiz from "../../components/Quiz";
import { getQuestions, startQuiz } from "../../lib/axios";
import nookies from "nookies"
import Link from "next/link";
import Head from "next/head";

const domain = ({ domain, questions, endTime }) => {
    return (
        <>
            <Head>
                <title>CSI - CCS | {domain.charAt(0).toUpperCase() + domain.slice(1)} Quiz</title>
            </Head>
            <div className="flex flex-nowrap flex-row justify-center relative">
                <Quiz domain={domain} questions={questions} endTime={endTime} />
                <div className="w-64 absolute left-0 pt-20 hidden 2xl:block ">
                    <img src={`/assets/quiz_${domain}.png`} alt={domain} />
                </div>
            </div>
        </>
    )
};

export default domain;

export async function getServerSideProps(ctx) {
    const { query: { domain } } = ctx
    const domains = ['tech', 'management', 'design', 'video']
    if (!domains.includes(domain)) {
        return {
            notFound: true
        }
    }

    const cookies = nookies.get(ctx)
    const { success, message: startMessage } = await startQuiz({ domain }, cookies);
    if (!success) {
        return {
            redirect: {
                destination: `/user/dashboard?success=${success}&msg=${startMessage}`
            }
        }
    }

    const { success: questionSuccess, result, message: quizMessage } = await getQuestions({ domain }, cookies);
    if (!questionSuccess)
        return {
            redirect: {
                destination: `/user/dashboard?success=${questionSuccess}&msg=${quizMessage}`
            }
        }
    const { questions, endTime } = result
    return {
        props: { success: true, domain, questions, endTime }
    }
}