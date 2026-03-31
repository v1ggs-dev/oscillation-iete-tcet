import { HiPencilAlt, HiClock, HiSpeakerphone, HiStar } from 'react-icons/hi';

export const timelineEvents = [
    {
        id: 1,
        title: "Registration & Team Formation",
        description: null, // Condense for completed states
        icon: <HiPencilAlt />,
        status: "completed",
    },
    {
        id: 2,
        title: "Ideathon Screening Round 1",
        description: "Concluded successfully on 29th March.",
        icon: <HiClock />,
        status: "completed",
    },
    {
        id: 3,
        title: "Project Presentation Submissions",
        description: "Abstract submissions successfully closed on 30th March.",
        icon: <HiClock />,
        status: "completed",
    },
    {
        id: 4,
        title: "Round 1 Results Announced",
        description: <><strong style={{color: 'var(--green-500)'}} className="text-glow">OUT NOW!</strong> The finalized selected teams for both tracks are now available. Check the Tracks section below!</>,
        icon: <HiStar />,
        status: "active",
    },
    {
        id: 5,
        title: "Grand Finale (Both Tracks)",
        description: <><strong>4th April 2026</strong> - The final event for both Ideathon and Project Presentation tracks. Showcase your work directly to expert judges!</>,
        icon: <HiSpeakerphone />,
        status: "upcoming",
    },
    {
        id: 6,
        title: "Awards Ceremony",
        description: "Top teams will be recognized with prizes, trophies, and special category awards.",
        icon: <HiStar />,
        status: "upcoming",
    },
];
