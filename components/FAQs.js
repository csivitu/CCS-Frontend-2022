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
    question: "Loreum",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Que Manilium, ab iisque M. Quod quidem nobis non saepe contingit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Que Manilium, ab iisque M. ",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Que Manilium, ab iisque M. Quod quidem nobis non saepe contingit.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Que Manilium, ab iisque M. Quod quidem nobis non saepe contingit.",
  },
  {
    question: "Loreum",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Que Manilium, ab iisque M. Quod quidem nobis non saepe contingit.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Que Manilium, ab iisque M. ",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Que Manilium, ab iisque M. Quod quidem nobis non saepe contingit.",
  },
  {
    question: "Loreum",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Que Manilium, ab iisque M. Quod quidem nobis non saepe contingit.",
  },
];

export default FAQs;
