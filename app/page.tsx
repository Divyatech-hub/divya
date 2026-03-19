'use client';

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-cyan-500 border-opacity-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold neon-gradient">DVP</div>
          <div className="hidden md:flex gap-8 text-sm font-mono">
            {/* <a href="#identity" className="link-underline">IDENTITY</a> */}
            <a href="/projects" className="link-underline">PROJECTS</a>
            <a href="#awards" className="link-underline">AWARDS</a>
            <a href="#leadership" className="link-underline">LEADERSHIP</a>
            <a href="#experience" className="link-underline">EXPERIENCE</a>
            <a href="#interface" className="link-underline">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* IDENTITY Section */}
      <section id="identity" className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 animate-fade-in">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-cyan-400 text-sm font-mono tracking-widest">// I AM</p>
                <h1 className="text-6xl md:text-7xl leading-tight">
                  <span className="neon-gradient">DIVYALAKSHMI</span>
                  <br />
                </h1>
              </div>

              <p className="subtitle text-gray-300 text-lg max-w-md">
                CS | Math | Entrepreneurship
                <br />
                AI, Cloud, DevOps Enthusiast
                <br />
                <span className="text-cyan-400 text-sm">Building user-centric systems that scale.</span>
              </p>

              <div className="flex flex-col gap-3 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-magenta-500"></div>
                  <span>x7 Hackathon Winner • Entrepreneur • AWS Builder</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400"></div>
                  <span>AI Fellow @ Cornell • Google Developer Groups MSU Lead • GCP Certified</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="#interface" className="neon-border-cyan px-6 py-3 hover-lift font-mono text-sm bg-cyan-400 text-black">
                  GET IN TOUCH →
                </a>
                <a href="https://github.com/Divyatech-hub" target="_blank" rel="noopener noreferrer" className="neon-border-magenta px-6 py-3 hover-lift font-mono text-sm">
                  GITHUB ↗
                </a>
              </div>
            </div>

            {/* Right - Profile Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-80 h-96 md:w-96 md:h-[480px]">
                <div className="absolute inset-0 neon-border-cyan rounded-2xl"></div>
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <img 
                    src="/divya headshot.png" 
                    alt="Divyalakshmi" 
                    className="w-full h-full object-contain bg-gradient-to-b from-gray-900 to-black"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 neon-border-magenta px-4 py-2 bg-black rounded text-xs font-mono">
                  OPEN TO OPPORTUNITIES
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT_REPOSITORY Section */}
      <section id="projects" className="py-20 px-6 bg-gradient-to-b from-black via-gray-950 to-black animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="space-y-4 flex items-center justify-between">
              <div>
                <h2 className="text-5xl magenta-lead">// PROJECTS</h2>
                <p className="text-gray-400 font-mono text-sm">// Featured work in AI, systems, and cloud computing</p>
              </div>
              <a href="/projects" className="neon-border-magenta px-6 py-3 hover-lift font-mono text-sm text-magenta-400 inline-block whitespace-nowrap">
                SEE ALL →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card */}
              {[
                {
                  title: 'Pill Pal',
                  desc: 'Innovative health management solution for pill tracking and medication reminders',
                  tech: ['HEALTH_TECH', 'FULL_STACK', 'INNOVATION'],
                  img: '/PillPall-thumbnail.png',
                  link: 'https://github.com/StephanieNhiLe/pill-pal',
                  linkLabel: 'GITHUB'
                },
                {
                  title: 'MoodMelody.AI',
                  desc: 'AI-powered music generation for TikTok creators using Gemini AI and LangChain',
                  tech: ['AI/LLM', 'GEMINI', 'FLASK', '3RD_PLACE_GLOBAL'],
                  img: '/Moodmelody-thumbnail.png',
                  link: 'https://github.com/StephanieNhiLe/MoodMelody-AI',
                  linkLabel: 'GITHUB'
                },
                {
                  title: 'SlugSei – AI Baseball Coach',
                  desc: 'Real-time swing analysis using computer vision and TensorFlow',
                  tech: ['TENSORFLOW', 'OPENCV', 'MEDIAPIPE', 'CLOUD_RUN'],
                  img: '/Slugsei-thumbnail.png',
                  link: 'https://github.com/StephanieNhiLe/slugsei',
                  linkLabel: 'GITHUB'
                },
              ].map((project, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative h-64 overflow-hidden rounded-lg mb-4 glass hover-lift">
                    <img 
                      src={project.img} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-cyan-400">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-xs px-2 py-1 neon-border-cyan rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-mono text-magenta-400 neon-border-magenta px-3 py-2 hover-lift transition"
                      >
                        {project.linkLabel} ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ACCOLADES & IMPACT Section */}
      <section id="awards" className="py-20 px-6 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="text-5xl magenta-lead">// AWARDS AND MILESTONES</h2>
            <p className="text-gray-400 font-mono text-sm">// Recognition and Competitive Success</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '07',
                title: 'HACKATHON WINS',
                img: '/award1.jpg',
              },
              {
                number: '12',
                title: 'SPEAKING ENGAGEMENTS',
                img: '/award2.jpg',
              },
              {
                number: '01',
                title: 'GCP CERTIFIED',
                img: '/award3.jpg',
              },
            ].map((award, i) => (
              <div key={i} className="relative group cursor-pointer">
                <div className="relative h-64 rounded-lg overflow-hidden neon-border-cyan glass hover-lift">
                  <img 
                    src={award.img} 
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                  <div className="absolute top-4 left-4">
                    <p className="text-cyan-400 font-mono text-3xl font-bold">{award.number}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white text-center">{award.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Hackathon Wins Subsection */}
          <div className="space-y-8 mt-16">
            <h3 className="text-3xl font-bold magenta-lead">// FEATURED HACKATHON WINS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'MoodMelody.AI',
                  achievement: '3rd Place Global',
                  event: 'Google AI Hackathon',
                  year: '2024',
                  desc: 'AI-powered music generation platform leveraging Gemini AI and LangChain'
                },
                {
                  title: 'SlugSei',
                  achievement: 'Innovation Award',
                  event: 'SC Hackathon',
                  year: '2024',
                  desc: 'Computer vision-based baseball swing analysis using TensorFlow'
                },
                {
                  title: 'Joblify',
                  achievement: 'DevPost Award',
                  event: 'Tech Conference Hackathon',
                  year: '2023',
                  desc: 'AI career companion for job application optimization'
                },
                {
                  title: 'Hypezone',
                  achievement: 'Winner',
                  event: 'AI Atlanta Hackathon',
                  year: '2024',
                  desc: 'AI-powered hyper-personalization platform'
                },
              ].map((win, i) => (
                <div key={i} className="glass rounded-lg p-6 neon-border-magenta hover-lift">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-cyan-400 mb-1">{win.title}</h4>
                      <p className="text-magenta-400 font-mono text-sm font-semibold mb-2">{win.achievement}</p>
                    </div>
                    <span className="text-gray-400 font-mono text-xs">{win.year}</span>
                  </div>
                  <p className="text-gray-400 text-xs font-mono mb-3">{win.event}</p>
                  <p className="text-gray-300 text-sm">{win.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & COMMUNITY Section */}
      <section id="leadership" className="py-20 px-6 bg-gradient-to-b from-black via-gray-950 to-black animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="text-5xl magenta-lead">// LEADERSHIP & COMMUNITY</h2>
            <p className="text-gray-400 font-mono text-sm">// Empowering communities and driving impact through volunteer leadership</p>
          </div>

          {/* Organization Carousel */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cyan-400">Active Organizations</h3>
            <div className="relative overflow-hidden py-8">
              <style>{`
                @keyframes scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .carousel-track {
                  animation: scroll 30s linear infinite;
                }
                .carousel-container:hover .carousel-track {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="carousel-container overflow-hidden w-full">
                <div className="carousel-track flex gap-8 whitespace-nowrap">
                  {[
                    { name: 'Google Developer Groups', logo: '/gdg logo.png' },
                    { name: 'Women TechMakers', logo: '/wtm logo.png' },
                    { name: 'Spartan Hackers', logo: '/spartan hackers.jpeg' },
                    { name: 'AnitaB.org', logo: '/anita b org.png' },
                    { name: 'Harvard WECode', logo: '/harvard.jpg' },
                    { name: 'HSOCC', logo: '/hsocc logo.png' },
                    { name: 'MSU College of Engineering', logo: '/msu college of eng.jpeg' },
                    { name: 'RTC', logo: '/RTC.jpeg' },
                    { name: 'Taskformer', logo: '/taskformer.jpeg' },
                    { name: 'WECode', logo: '/wecode.png' },
                    { name: 'MSU ICER', logo: '/icer logo.png' },
                    { name: 'TP Connects', logo: '/tpc connects logo.png' },
                    // Duplicate for seamless loop
                    { name: 'Google Developer Groups', logo: '/gdg logo.png' },
                    { name: 'Women TechMakers', logo: '/wtm logo.png' },
                    { name: 'Spartan Hackers', logo: '/spartan hackers.jpeg' },
                    { name: 'AnitaB.org', logo: '/anita b org.png' },
                    { name: 'Harvard WECode', logo: '/harvard.jpg' },
                    { name: 'HSOCC', logo: '/hsocc logo.png' },
                    { name: 'MSU College of Engineering', logo: '/msu college of eng.jpeg' },
                    { name: 'RTC', logo: '/RTC.jpeg' },
                    { name: 'Taskformer', logo: '/taskformer.jpeg' },
                    { name: 'WECode', logo: '/wecode.png' },
                    { name: 'MSU ICER', logo: '/icer logo.png' },
                    { name: 'TP Connects', logo: '/tpc connects logo.png' },
                  ].map((org, i) => (
                    <div key={i} className="flex-shrink-0 w-32 h-32 glass rounded-lg neon-border-cyan p-4 flex items-center justify-center hover-lift">
                      <img src={org.logo} alt={org.name} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Roles Detail */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cyan-400">Leadership Roles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  org: 'Google Developer Groups',
                  role: 'Co-President for GDG and AIx',
                  period: '2024 - PRESENT',
                  desc: 'Kickstarted MSU\'s GDG chapter, co-led technical programming, and organized workshops on Flutter, Firebase, TensorFlow, Gemini, BigQuery, and Google Cloud.',
                  impact: '415+ members, 12 leadership team',
                  logo: '/gdg logo.png'
                },
                {
                  org: 'Harvard WECode',
                  role: 'Scholar',
                  period: '2025',
                  desc: 'Selected as Harvard WECode Scholar and engaged in leadership development, technical sessions, and community-building initiatives.',
                  impact: 'Global women-in-tech network',
                  logo: '/harvard.jpg'
                },
                {
                  org: 'Amazon Web Services',
                  role: 'All Builders Welcome Grant Recipient',
                  period: '2025',
                  desc: 'Awarded AWS All Builders Welcome grant support to accelerate technical projects, cloud learning, and community impact.',
                  impact: 'Cloud project acceleration support',
                  logo: '/aws logo.jpeg'
                },
                {
                  org: 'Google Cloud',
                  role: 'Student Innovator',
                  period: '2024 - PRESENT',
                  desc: 'Selected among 16,000 applicants as part of an exclusive 200-student innovator cohort focused on production cloud solutions and AI tools.',
                  impact: 'Top 200 globally selected',
                  logo: '/Google Cloud Digital Leader Certification.png'
                },
                {
                  org: 'Michigan State University HSOCC',
                  role: 'Outreach Coordinator',
                  period: '2024 - PRESENT',
                  desc: 'Coordinated outreach initiatives to connect students with engineering opportunities, events, and mentorship pathways.',
                  impact: 'Expanded engineering outreach programs',
                  logo: '/hsocc logo.png'
                },
                {
                  org: 'Spartan Hackers',
                  role: 'Tech Lead',
                  period: '2024 - PRESENT',
                  desc: 'Led technical planning and execution support for hackathon initiatives, engineering workshops, and student developer projects.',
                  impact: 'Cross-campus hackathon enablement',
                  logo: '/spartan hackers.jpeg'
                },
              ].map((role, i) => (
                <div key={i} className="glass rounded-lg p-6 neon-border-magenta hover-lift">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <img src={role.logo} alt={`${role.org} logo`} className="w-10 h-10 object-contain rounded" />
                      <div>
                        <h4 className="text-lg font-bold text-cyan-400">{role.org}</h4>
                        <p className="text-magenta-400 font-mono text-sm font-semibold">{role.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 font-mono text-xs">{role.period}</p>
                    <p className="text-gray-300 text-sm">{role.desc}</p>
                    <div className="pt-3 border-t border-cyan-500 border-opacity-20">
                      <p className="text-cyan-400 text-xs font-mono">✦ {role.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL EXPERIENCE Section */}
      <section id="experience" className="py-20 px-6 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="text-5xl magenta-lead">// PROFESSIONAL EXPERIENCE</h2>
            <p className="text-gray-400 font-mono text-sm">// Industry roles and technical expertise</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 to-magenta-500 -translate-x-1/2"></div>

            <div className="space-y-16">
              {[
                {
                  company: 'ASAPP x Break Through Tech AI (Cornell Fellowship)',
                  logo: '/asapp_logo.jpeg',
                  role: 'AI Engineer Intern (Fellowship)',
                  period: 'SEP 2025 - DEC 2025',
                  desc: 'Led a team of 5 to build an AI platform over 10,000+ customer service conversations using Next.js, Python, FastAPI, Gemini API, and SQLite; demoed to 100+ fellows and industry leaders.',
                  side: 'left'
                },
                {
                  company: 'NUCOR STEEL',
                  logo: '/nucor logo.png',
                  role: 'Software Automation Intern',
                  period: 'MAY 2025 - AUG 2025',
                  desc: 'Automated Oracle EBS testing across 10+ steel divisions and built Baymax, an Agentic AI safety hub with C3.ai, Azure Event Grid, Databricks, Python, C#, SQL, and REST APIs.',
                  side: 'right'
                },
                {
                  company: 'ViaLearn',
                  logo: '/vialearn.png',
                  role: 'Full-Stack Developer',
                  period: 'MAR 2025 - JUL 2025',
                  desc: 'Led a team of 4 to build an AI productivity app using Flutter, Firebase, Python, LangChain, RAG, FastAPI, GCP, ChromaDB, and OpenAI APIs, reducing planning time by 30%.',
                  side: 'left'
                },
                {
                  company: 'TECHSMITH',
                  logo: '/techsmith logo.jpeg',
                  role: 'Site Reliability Engineer (SRE)',
                  period: 'MAY 2024 - AUG 2024',
                  desc: 'Worked on Kubernetes/Flux/Prometheus cloud-native infrastructure, CI/CD automation with Terraform and Helm, and delivered an Internal Developer Portal for 300+ developers.',
                  side: 'right'
                },
                {
                  company: 'Google Developer Groups (GDG)',
                  logo: '/gdg logo.png',
                  role: 'President and Cloud Student Innovator',
                  period: 'OCT 2023 - PRESENT',
                  desc: 'Selected among 16,000 applicants as one of 200 Google Cloud Student Innovators and led MSU GDG community growth to 415+ members.',
                  side: 'left'
                },
                {
                  company: 'MSU College of Engineering (CSE Department)',
                  logo: '/msu college of eng.jpeg',
                  role: 'CSE 331 Undergraduate Learning Assistant (DSA in Python)',
                  period: 'JAN 2024 - MAY 2025',
                  desc: 'Supported weekly instruction for ~350 students, led help room/debugging sessions, and contributed projects, homework, and exam review content.',
                  side: 'right'
                },
                {
                  company: 'MSU Honors College',
                  logo: '/msu honors college.jpg',
                  role: 'Professorial Assistant',
                  period: '2024 - 2025',
                  desc: 'Supported faculty research and honors program academic initiatives through project coordination, research tasks, and documentation.',
                  side: 'left'
                },
                {
                  company: 'MSU College of Engineering',
                  logo: '/msu college of eng.jpeg',
                  role: 'Outreach Ambassador',
                  period: '2024 - PRESENT',
                  desc: 'Represented the college in outreach programs, mentoring efforts, and student-facing events to broaden engineering participation.',
                  side: 'right'
                },
                {
                  company: 'TP Connects',
                  logo: '/tpc connects logo.png',
                  role: 'Community and Strategy Contributor',
                  period: '2024 - PRESENT',
                  desc: 'Contributed to community programming, advisory initiatives, and event strategy for cross-community engagement.',
                  side: 'left'
                },
                {
                  company: 'MSU ICER',
                  logo: '/icer logo.png',
                  role: 'Research Computing Contributor',
                  period: '2024 - PRESENT',
                  desc: 'Collaborated on student-facing research computing initiatives and technical community support activities.',
                  side: 'right'
                },
                {
                  company: 'Buildspace',
                  logo: '/buildspace.png',
                  role: 'Builder and Hackathon Participant (S5 Nights & Weekends)',
                  period: '2025',
                  desc: 'Built and shipped project ideas through Buildspace S5 while actively participating in builder community hackathon cycles.',
                  side: 'left'
                },
              ].map((exp, i) => (
                <div key={i} className="relative flex items-start gap-8">
                  {/* Circle on center */}
                  <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
                    <div className="relative w-16 h-16 rounded-full bg-black border border-cyan-400/80 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Left Side Card */}
                  {exp.side === 'left' && (
                    <div className="w-1/2 pr-16">
                      <div className="relative">
                        <span className="absolute top-6 h-px w-16 -right-16 bg-gradient-to-r from-cyan-400 to-magenta-400"></span>
                        <div className="glass rounded-2xl p-6 hover-lift neon-border-cyan">
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-gray-400 font-mono text-xs tracking-widest">{exp.period}</span>
                            <h3 className="text-xl font-bold text-cyan-400 text-right">{exp.role}</h3>
                            <p className="text-magenta-400 font-semibold text-right">{exp.company}</p>
                          </div>
                          <p className="text-gray-300 text-sm mt-3 text-right">{exp.desc}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Right Side Card */}
                  {exp.side === 'right' && (
                    <div className="w-1/2 pl-16 ml-auto">
                      <div className="relative">
                        <span className="absolute top-6 h-px w-16 -left-16 bg-gradient-to-r from-cyan-400 to-magenta-400"></span>
                        <div className="glass rounded-2xl p-6 hover-lift neon-border-magenta">
                          <div className="flex flex-col items-start gap-2">
                            <span className="text-gray-400 font-mono text-xs tracking-widest">{exp.period}</span>
                            <h3 className="text-xl font-bold text-cyan-400 text-left">{exp.role}</h3>
                            <p className="text-magenta-400 font-semibold text-left">{exp.company}</p>
                          </div>
                          <p className="text-gray-300 text-sm mt-3 text-left">{exp.desc}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4 mt-16">
            <h3 className="text-3xl font-bold magenta-lead">EDUCATION</h3>
            <div className="glass p-8 rounded-lg neon-border-magenta space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-mono text-sm">2021 - 2025</p>
                  <h4 className="text-2xl font-bold text-white">B.S. Computer Science</h4>
                  <p className="text-cyan-400">Michigan State University • Honors College</p>
                  <p className="text-gray-400 text-sm mt-2">Math & Entrepreneurship Minors • Dean's List • 3.95+ GPA</p>
                </div>
                <img src="/msu college of eng.jpeg" alt="MSU College of Engineering" className="w-20 h-20 object-contain" />
              </div>
            </div>

            <div className="glass p-8 rounded-lg neon-border-cyan space-y-4">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-gray-400 font-mono text-sm">AUG 2025</p>
                  <h4 className="text-2xl font-bold text-white">Machine Learning Foundations e-Certificate</h4>
                  <p className="text-cyan-400">Cornell University • Break Through Tech</p>
                  <p className="text-gray-300 text-sm mt-2">Relevant Coursework: Data Structures, Data Analysis, Training Classification and Regression Models, Natural Language Modelling</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src="/Cornell_University.png" alt="Cornell University" className="w-20 h-20 object-contain" />
                  <img src="/BTT logo.png" alt="Break Through Tech" className="w-20 h-20 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY Section */}
      <section id="gallery" className="py-20 px-6 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl magenta-lead">// PHOTO GALLERY</h2>
            <p className="text-gray-400 font-mono text-sm">// A visual exploration of ideas, places, and perspectives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: '/gallery1.jpg', alt: 'Gallery 1' },
              { img: '/gallery2.jpg', alt: 'Gallery 2' },
              { img: '/gallery3.jpg', alt: 'Gallery 3' },
            ].map((item, i) => (
              <div key={i} className="relative h-64 rounded-lg overflow-hidden hover-lift cursor-pointer neon-border-cyan glass">
                <img src={item.img} alt={item.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="text-right">
            <a href="#" className="text-magenta-400 font-mono text-sm link-underline">FULL_ARCHIVE →</a>
          </div>
        </div>
      </section>

      {/* INTERFACE / Contact Section */}
      <section id="interface" className="py-20 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-bold">
              <span className="text-white">LET'S BUILD</span>
              <br />
              <span className="neon-gradient">AMAZING SYSTEMS</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm max-w-lg mx-auto">
              // AI, DevOps, and Systems Design enthusiast open to roles, mentoring, and collaborations
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <a href="mailto:divyalakshmivara2022@gmail.com" className="font-mono text-sm link-underline text-cyan-400">DIVYALAKSHMIVARA2022@GMAIL.COM →</a>
          </div>

          <div className="flex justify-center gap-4 font-mono text-sm">
            <a href="https://github.com/Divyatech-hub" target="_blank" rel="noopener noreferrer" className="link-underline text-cyan-400">GITHUB</a>
            <span className="text-gray-600">·</span>
            <a href="https://www.linkedin.com/in/divyalakshmi-vrps" target="_blank" rel="noopener noreferrer" className="link-underline text-magenta-400">LINKEDIN</a>
            <span className="text-gray-600">·</span>
            <a href="https://g.dev/divyalakshmivrps" target="_blank" rel="noopener noreferrer" className="link-underline text-cyan-400">GOOGLE_DEV</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500 border-opacity-20 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-gray-500 font-mono text-xs">
            © 2025 DIVYALAKSHMI V.P. | Crafted with AI & DevOps passion | BUILT WITH NEXT.JS + NEON_AESTHETICS
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </div>
      </footer>
    </div>
  );
}
