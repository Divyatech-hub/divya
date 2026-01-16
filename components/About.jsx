import DevImg from "./DevImg";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    User2, 
    MailIcon,
    HomeIcon,
    PhoneCall,
    GraduationCap,
    Book,
    Briefcase,
} from 'lucide-react';

const infoData = [
    {
        icon: <User2 size={20} />,
        text: 'Divyalakshmi V.P.',
    },
    {
        icon: <PhoneCall size={20} />,
        text: '+1(517)-275-6145',
    },
    {
        icon: <MailIcon size={20} />,
        text: 'divyalakshmivara2022@gmail.com',
    },
    {
        icon: <HomeIcon size={20} />,
        text: 'East Lansing, Michigan',
    }
];

const qualificationData = [
    {
        title: 'education',
        data: [
            {
                university: 'Michigan State University',
                qualificationData: 'Bachelor of Science',
                majors: 'Computer Science + Mathematics',
                minors: "Entrepreneurship and Innovation",
                years: 'August 2022- May 2026'
            },
            {
                university: 'GEMS Our Own English High School, Dubai',
                qualificationData: 'High School Diploma',
                majors: 'Computer Science + Mathematics + Physics',
                minors: "",
                years: 'June 2008- June 2022'
            }

        ]
    }
];

const skillsData = [
    {
        title:'skills',
        data: [
            {
                imgPath: 'Python',
            },
            {
                imgPath: 'C++',
            },
            {
                imgPath: 'C',
            },
            {
                imgPath: 'HTML5',
            },
            {
                imgPath: 'CSS3',
            },
            {
                imgPath: 'Javascript',
            },
            {
                imgPath: 'Typescript',
            },
            {
                imgPath: 'Go',
            },
            {
                imgPath: 'Terraform',
            },
            {
                imgPath: 'Dart',
            },
            {
                imgPath: 'React.js',
            },
            {
                imgPath: 'Next.js',
            },
            {
                imgPath: 'Material UI',
            },
            {
                imgPath: 'Tailwind CSS',
            },
            {
                imgPath: 'Bootstrap',
            },
            {
                imgPath: 'Flutter',
            },
            {
                imgPath: 'Git',
            },
            {
                imgPath: 'Github',
            },
            {
                imgPath: 'Linux',
            },
            {
                imgPath: 'Power BI',
            },
            {
                imgPath: 'Amazon Web Services',
            },
            {
                imgPath: 'Google Cloud Platform',
            },
            {
                imgPath: 'REST APIs',
            }, 
            {
                imgPath: 'Websockets',
            }, 
            {
                imgPath: 'Microsoft Azure',
            },
            {
                imgPath: 'MySQL',
            },
            {
                imgPath: 'MongoDB',
            },
            {
                imgPath: 'Shell Scripting',
            },
            {
                imgPath: 'Kubernetes',
            },
            {
                imgPath: 'CI/CD',
            },
            {
                imgPath: 'Docker',
            },
            {
                imgPath: 'Gemini AI API',
            },
            {
                imgPath: 'Langchain',
            },
            {
                imgPath: 'Machine Learning',
            },
            {
                imgPath: 'Firebase',
            },
            {
                imgPath: 'Prometheus',
            },
            {
                imgPath: 'Grafana',
            },
            {
                imgPath: 'Flux',
            },
            {
                imgPath: 'Nginx',
            },
            {
                imgPath: 'Helm',
            },
            {
                imgPath: 'Trello',
            },
            {
                imgPath: 'Project Management',
            },
            {
                imgPath: 'Figma',
            },
            {
                imgPath: 'Vercel',
            }
        ]

    }
];

const About = () => {
  return (
    <section className="xl:h-[860px] pb-12 xl:py-24">
        <div className="container mx-auto">
            <h2 className="section-title mb-8 xl:mb-16 text-center mx-auto">
                About me
            </h2>
        </div>
    </section>
  )
}

export default About
