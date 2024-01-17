import M_Piece from '../../public/assets/piece_m.svg';
import Domain from './Domain';
import { isEmpty } from 'lodash';

function Domains({ domainsAttempted = {} }) {
    const findEndTime = (domain) => {
        if (isEmpty(domainsAttempted)) return null;
        const something = domainsAttempted.find((e) => e.domain === domain);
        if (!something) return null;
        const { endTime, submitted } = something;
        if (submitted) return { completed: true };

        if (new Date(endTime) < new Date()) return { completed: true };

        return { completed: false };
    };
    return (
        <section
            id="domains"
            className="relative min-h-screen flex flex-col items-center justify-center bg-peach text-gray-dark py-16 md:py-20 px-5 text-center"
        >
            <h1 className="relative text-4xl md:text-6xl mb-3 font-extrabold">
                DOMAINS
                <M_Piece className="absolute w-8 -top-2 -left-4 md:w-10 md:-top-2 md:-left-4" />
            </h1>
            <p className="font-light md:text-xl tracking-wide	mb-8">Choose Where You Would Like To Fit In</p>
            <div className="flex flex-row flex-wrap justify-center pl-20">
                {domainsDetails().map((d, i) => (
                    <Domain key={i} details={d} endTime={findEndTime(d.name)} />
                ))}
            </div>
        </section>
    );
}

export const domainsDetails = (endTime = null) => [
    {
        name: 'design',
        route: '/quiz/design',
        image: '/assets/design.png',
        imageHover: '/assets/design-hover-2.webp',
        smImage: '/assets/design-sm.png',
        description: 'Do you wish to be creative and fill out the canvas that is yours truly?',
        endTime,
    },
    {
        name: 'management',
        route: '/quiz/management',
        image: '/assets/management.png',
        imageHover: '/assets/management-hover-2.webp',
        smImage: '/assets/management-sm.png',
        description: "Want to hold the fort down and manage global scale events? Let's see you handle this first :)",
        endTime,
    },
    {
        name: 'tech',
        route: '/quiz/tech',
        image: '/assets/tech.png',
        imageHover: '/assets/tech-hover-2.webp',
        smImage: '/assets/tech-sm.png',
        description: "Do you think you can turn your bugs into features? We'd love to see!",
        endTime,
    },
    {
        name: 'video',
        route: '/quiz/video',
        image: '/assets/video.png',
        imageHover: '/assets/video-hover-2.webp',
        smImage: '/assets/video-sm.png',
        description: 'Looking to put your ideas in motion? Pun intended.',
        endTime,
    },
];

export default Domains;
