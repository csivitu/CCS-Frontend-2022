import DownArrow from '../../public/assets/down_arrow.svg';
import M_Piece from '../../public/assets/piece_m.svg';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
// import Image from 'next/image';

function FAQs() {
    return (
        <section
            id="faqs"
            className="flex flex-col gap-4 w-full min-h-screen relative items-center bg-peach text-gray-dark py-32 justify-center"
        >
            <h1 className="relative text-4xl md:text-6xl mb-3 font-extrabold">
                FAQs
                <M_Piece className="absolute w-8 -top-2 -left-4 md:w-10 md:-top-2 md:-left-4" />
            </h1>
            {faqs.map((faq, index) => (
                <div key={`faq${index}`} className="w-10/12 md:w-2/3">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<DownArrow />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            {faq.question}
                        </AccordionSummary>
                        <AccordionDetails>{faq.answer}</AccordionDetails>
                    </Accordion>
                </div>
            ))}
            {/* <h1 className="relative text-4xl md:text-6xl mb-3 mt-10 font-extrabold">Still have doubts?</h1>
            <h1 className="relative text-2xl md:text-4xl mb-5 font-light text-center w-11/12">
                Read this blog to find your answers
            </h1>
            <div className="max-w-3xl w-10/12 ">
                <a
                    href="https://medium.com/csivit/everything-about-csi-recruitments-2023-a405a17fc28b"
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="transition duration-200 ease-in-out hover:shadow-2xl leading-3">
                        <Image src="/assets/medium_article.png" width={1138} height={839} alt="guide" priority={true} />
                    </div>
                </a>
            </div> */}
        </section>
    );
}

const faqs = [
    // {
    //     question: "Who all can participate in CSI-VIT's recruitments?",
    //     answer: 'CSI-VIT only recruits first-year students.',
    // },
    {
        question: 'Can we attempt the Tech domain in Round 1 without having any prior experience?',
        answer: 'Yes! Everyone is welcome to attempt tests in any domain. All we need from you is a willingness to learn and develop.',
    },
    {
        question: 'How will I be notified if I clear a Round?',
        answer: 'Please keep a close eye on your Mail Inbox!',
    },
    {
        question: 'Can we ChatGPT the answers during the test?',
        answer: 'Jesus is watching you.',
    },
    {
        question: 'Do we have to pay any registration fee after joining the chapter?',
        answer: 'Nada.',
    },
    {
        question: 'Can I be a part of multiple domains?',
        answer: 'Absolutely! You can attempt tests for multiple domains as well as be a part of multiple domains after recruitments.',
    },
];

export default FAQs;
