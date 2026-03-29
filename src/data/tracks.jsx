import { HiGlobeAlt, HiLightBulb, HiRefresh, HiAcademicCap, HiCog } from 'react-icons/hi';
import { FaRobot, FaBrain, FaCode, FaMicrochip, FaLink, FaPalette, FaHandsHelping, FaStar, FaUsers } from 'react-icons/fa';

export const ideathonTrack = {
    title: "Ideathon",
    subtitle: "Pitch Your Vision",
    icon: <HiLightBulb />,
    description:
        "Present your innovative ideas in a fast-paced pitch round. No coding required — just creativity, clarity, and impact.",
    details: {
        winner: "Trophy + Certificates",
        duration: "3–5 minutes per team",
        qa: "2 minutes Q&A",
        teamSize: "1–4 members",
        format: "Slides + Verbal Pitch",
        submission: "Screening Round 1 concluded. Results soon!",
        language: "English Only",
    },
    themes: [
        {
            name: "Tech for Social Good",
            icon: <HiGlobeAlt />,
            description: "Technology solutions addressing social challenges",
        },
        {
            name: "AI for Bharat",
            icon: <FaBrain />,
            description: "AI-driven solutions for India's unique needs",
        },
        {
            name: "Sustainable Innovation",
            icon: <HiRefresh />,
            description: "Eco-friendly and sustainable tech solutions",
        },
        {
            name: "Smart Campus Solution",
            icon: <HiAcademicCap />,
            description: "Making educational campuses smarter",
        },
        {
            name: "Future of Automation",
            icon: <FaRobot />,
            description: "Next-gen automation and intelligent systems",
        },
    ],
};

export const projectPresentationTrack = {
    title: "Project Presentation",
    subtitle: "Build & Showcase",
    icon: <HiCog />,
    description:
        "Build a working prototype combining hardware and software. Demonstrate your technical skills with a real, functional project.",
    details: {
        prizePool: "Prizes worth ₹7.8K!",
        teamSize: "1–4 members",
        duration: "10 minutes per team",
        demo: "Live working prototype required",
        submission: "Screening Round 1 submissions live till 30th March, 12:00 PM",
    },
    subtracks: [
        {
            name: "AI / ML",
            icon: <FaBrain />,
            description: "Artificial Intelligence & Machine Learning solutions",
        },
        {
            name: "Web Development",
            icon: <FaCode />,
            description: "Full-stack web applications and platforms",
        },
        {
            name: "Embedded Systems",
            icon: <FaMicrochip />,
            description: "IoT, microcontrollers, and hardware integration",
        },
        {
            name: "Blockchain",
            icon: <FaLink />,
            description: "Decentralized apps and blockchain solutions",
        },
    ],

    specialAwards: [
        { name: "Best UI/UX", icon: <FaPalette /> },
        { name: "Most Social Impact", icon: <FaHandsHelping /> },
        { name: "Jury Choice", icon: <FaStar /> },
        { name: "Audience Choice", icon: <FaUsers /> },
    ],
};
