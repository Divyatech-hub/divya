'use client';

export default function ProjectsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-cyan-500 border-opacity-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold neon-gradient">DVP</div>
          <div className="hidden md:flex gap-8 text-sm font-mono">
            <a href="/#projects" className="link-underline">PROJECTS</a>
            <a href="/#awards" className="link-underline">AWARDS</a>
            <a href="/#experience" className="link-underline">EXPERIENCE</a>
            <a href="/#interface" className="link-underline">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* PROJECT GALLERY Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-950 to-black animate-fade-in pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold">
                <span className="text-white">PROJECT</span>
                <br />
                <span className="neon-gradient">GALLERY</span>
              </h1>
              <p className="text-gray-400 font-mono text-sm">// A repository of high-throughput systems, mathematical visualizations, and neural architectures.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                {
                  title: 'IWD Website',
                  desc: 'International Women\'s Day celebration website showcasing inspiring stories and global impact',
                  tech: ['NEXT.JS', 'TAILWIND', 'REACT', 'DESIGN'],
                  img: '/IWD-2025-Summit-Website-thumbnail.png',
                  link: 'https://iwd-website-2025.vercel.app',
                  linkLabel: 'VISIT WEBSITE'
                },
              ].map((project, i) => (
                <div key={i} className="group">
                  <div className="relative overflow-hidden rounded-lg mb-4 glass hover-lift">
                    <div className="relative h-64 w-full">
                      <img 
                        src={project.img} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm">{project.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-xs px-2 py-1 neon-border-cyan rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2">
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

            <div className="text-center pt-12">
              <a href="/" className="text-magenta-400 font-mono text-sm link-underline">← BACK_TO_HOME</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500 border-opacity-20 py-8 px-6 mt-20">
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
