import DownArrow from '../../public/assets/down_arrow.svg';
import M_Piece from '../../public/assets/piece_m.svg';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';

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
            
        </section>
    );
}

const faqs = [
    {
        question: 'Can we attempt the Tech domain in Round 1 without having any prior experience?',
        answer: 'Yes! We do not require or expect extensive domain experience from first-years. All we need is your enthusiasm to learn and grow.',
    },
    {
        question: 'How will I be updated on the Interactions?',
        answer: 'Keep an eye out on our socials and your inbox for future updates. Follow us on our socials and make sure you’re a part of the CSI Community on WhatsApp to be involved in all our events.',
    },
    {
        question: 'Can we Google the answers during the test?',
        answer: 'Jesus is watching you.',
    },
    {
        question: 'Do we have to pay any registration fee after joining the chapter?',
        answer: 'Nada.',
    },
    {
        question: 'Can I be a part of multiple domains?',
        answer: 'Absolutely. You\'re allowed to give the domain tests for a maximum of 2 domains during Interactions. After you\'re in, feel free to explore as you wish!',
    },
];

export default FAQs;
