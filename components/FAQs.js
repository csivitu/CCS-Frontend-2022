import DownArrow from "../public/assets/down_arrow.svg";
import M_Piece from "../public/assets/piece_m.svg";
import L_Piece from "../public/assets/domain_l.svg";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

function FAQs() {
  return (
    <section
      id="faqs"
      className="flex flex-col gap-4 w-full min-h-screen relative items-center bg-peach text-gray-dark py-32 justify-center"
    >
      <div className="absolute left-2 md:left-5 -bottom-16">
        <L_Piece className="w-32 md:w-44 lg:w-44" />
      </div>
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
    </section>
  );
}

const faqs = [
  {
    question:
      "Can we attempt the Tech domain in Round 1 without having any prior experience?",
    answer:
      "Yes! Everyone is welcome to attempt tests in any domain. All we need from you is a willingness to learn and develop.",
  },
  {
    question: "How will I be notified if I clear a Round?",
    answer: "Please keep a close eye on your Mail Inbox!",
  },
  {
    question: "Can we Google the answers during the test?",
    answer: "Jesus is watching you.",
  },
  {
    question:
      "Do we have to pay any registration fee after joining the chapter?",
    answer: "Nada.",
  },
  {
    question: "Can you be a part of multiple domains?",
    answer:
      "Absolutely! You can attempt tests for multiple domains as well as be a part of multiple domains after recruitments.",
  },
];

export default FAQs;
