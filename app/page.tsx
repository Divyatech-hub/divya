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
            <a href="#projects" className="link-underline">PROJECTS</a>
            <a href="#awards" className="link-underline">AWARDS</a>
            <a href="#experience" className="link-underline">EXPERIENCE</a>
            <a href="#interface" className="link-underline">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* IDENTITY Section */}
      <section id="identity" className="min-h-screen flex items-center justify-center px-6 py-20 pt-32">
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
      <section id="projects" className="py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-5xl magenta-lead">// PROJECTS</h2>
              <p className="text-gray-400 font-mono text-sm">// Featured work in AI, systems, and cloud computing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card */}
              {[
                {
                  title: 'MoodMelody.AI',
                  desc: 'AI-powered music generation for TikTok creators using Gemini AI and LangChain',
                  tech: ['AI/LLM', 'GEMINI', 'FLASK', '3RD_PLACE_GLOBAL'],
                  img: '/moodmelody.jpg'
                },
                {
                  title: 'SlugSei – AI Baseball Coach',
                  desc: 'Real-time swing analysis using computer vision and TensorFlow',
                  tech: ['TENSORFLOW', 'OPENCV', 'MEDIAPIPE', 'CLOUD_RUN'],
                  img: '/slugsei.jpg'
                },
                {
                  title: 'PillPal AI',
                  desc: 'Accessible medication management for underserved communities using LLMs',
                  tech: ['LANGCHAIN', 'OPENAI', 'FASTAPI', 'REACT_NATIVE'],
                  img: '/pillpal.jpg'
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACCOLADES & IMPACT Section */}
      <section id="awards" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="text-5xl magenta-lead">// AWARDS AND MILESTONES</h2>
            <p className="text-gray-400 font-mono text-sm">// Recognition and Competitive Success</p>
          </div>

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
                title: 'COMMUNITY LEAD',
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
        </div>
      </section>

      {/* EXPERIENCE Section */}
      <section id="experience" className="py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="text-5xl magenta-lead">// EXPERIENCE</h2>
            <p className="text-gray-400 font-mono text-sm">// Professional Journey & Impact</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-magenta-500 transform md:-translate-x-1/2"></div>

            <div className="space-y-16">
              {[
                {
                  company: 'NUCOR STEEL',
                  logo: '/nucor-logo.jpg',
                  role: 'Software Automation Intern',
                  period: '2024 - PRESENT',
                  desc: 'Building intelligent onboarding tools using Copilot Studio, Azure, and C3 AI for manufacturing safety',
                  side: 'right'
                },
                {
                  company: 'TECHSMITH',
                  logo: '/techsmith-logo.jpg',
                  role: 'Site Reliability Engineer (SRE)',
                  period: '2023 - 2024',
                  desc: 'Managed cloud infrastructure, DevOps pipelines, and infrastructure-as-code deployments',
                  side: 'left'
                },
                {
                  company: 'BREAK THROUGH TECH AI',
                  logo: '/bt-ai-logo.jpg',
                  role: 'AI Fellow',
                  period: '2024 - PRESENT',
                  desc: 'Advanced ML training through ML Foundations + AI Studio programs focusing on real-world AI applications',
                  side: 'right'
                },
              ].map((exp, i) => (
                <div key={i} className={`flex items-center ${exp.side === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1 hidden md:block"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 md:translate-x-0 w-8 h-8 bg-black border-2 border-cyan-400 rounded-full flex items-center justify-center z-10">
                    <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-cyan-400' : i === 1 ? 'bg-magenta-400' : 'bg-cyan-400'}`}></div>
                  </div>

                  <div className={`flex-1 ${exp.side === 'right' ? 'mr-12 text-right' : 'ml-12'}`}>
                    <div className="space-y-2">
                      <p className="text-gray-400 font-mono text-xs">{exp.period}</p>
                      <h3 className="text-xl font-bold text-cyan-400">{exp.role}</h3>
                      <p className="text-magenta-400 font-semibold">{exp.company}</p>
                      <p className="text-gray-300 text-sm mt-2">{exp.desc}</p>
                    </div>
                  </div>
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
                <img src="/msu-logo.png" alt="MSU" className="w-20 h-20 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY Section */}
      <section id="gallery" className="py-32 px-6">
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
      <section id="interface" className="py-32 px-6">
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
