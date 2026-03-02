import { HiPencilAlt, HiClock, HiSpeakerphone, HiStar } from 'react-icons/hi';

export const timelineEvents = [
    {
        id: 1,
        title: "Registration Opens",
        description: <><strong>3rd March 2026</strong> - Sign up your team and choose your track</>,
        icon: <HiPencilAlt />,
        status: "upcoming",
    },
    {
        id: 2,
        title: "Ideathon Submission Window",
        description: <><strong>25th March – 1st April 2026</strong> - Upload your pitch deck (PPT) following the official template before the deadline</>,
        icon: <HiClock />,
        status: "upcoming",
    },
    {
        id: 3,
        title: "Registration Deadline",
        description: <><strong>1st April 2026</strong> - Last date to register your team for both tracks</>,
        icon: <HiClock />,
        status: "upcoming",
    },
    {
        id: 4,
        title: "Project Presentations",
        description: <><strong>4th April 2026</strong> - Showcase your innovation to a panel of expert judges. Present your working prototype, explain your approach, and demonstrate real-world impact.</>,
        icon: <HiSpeakerphone />,
        status: "upcoming",
    },
    {
        id: 5,
        title: "Winners Announced",
        description: "The moment you've been waiting for! Top teams will be recognized with prizes, trophies, certificates, and special category awards.",
        icon: <HiStar />,
        status: "upcoming",
    },
];
