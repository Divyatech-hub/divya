import Link from 'next/link';
import { Github } from 'lucide-react';

export default function ProjectsNew() {
  const projects = [
    {
      name: "MoodMelody.AI",
      description: "AI music generation for content creators",
      tags: ["React", "Gemini AI", "Flask"],
      link: "https://github.com/StephanieNhiLe/MoodMelody-AI",
      award: "3rd Place - TikTok Tech Jam",
      image: "🎵"
    },
    {
      name: "SlugSei",
      description: "Real-time baseball swing analysis using computer vision",
      tags: ["OpenCV", "TensorFlow", "FastAPI"],
      link: "https://github.com/StephanieNhiLe/slugsei",
      image: "⚾"
    },
    {
      name: "PillPal AI",
      description: "Medication management app for underserved communities",
      tags: ["React Native", "LangChain", "OpenAI"],
      link: "https://github.com/StephanieNhiLe/pill-pal",
      image: "💊"
    },
    {
      name: "CrowdSecure",
      description: "Blockchain-based crowdfunding platform",
      tags: ["Python", "Web3", "Smart Contracts"],
      link: "https://github.com/AashishH15/CrowdSecure",
      award: "Best Cybersecurity - MHacks",
      image: "🔗"
    }
  ];

  return (
    <section className="bg-black text-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-3 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Featured Projects</h2>
        <p className="text-gray-400 mb-12 max-w-2xl">Check out some of my recent work.</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="group cursor-pointer h-full">
              <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-white transition duration-300 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-40 md:h-48 flex items-center justify-center text-6xl md:text-7xl group-hover:scale-110 transition duration-300">
                  {project.image}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {project.award && (
                    <span className="inline-block text-xs font-bold text-yellow-400 mb-3 w-fit">★ {project.award}</span>
                  )}
                  <h3 className="text-xl md:text-2xl font-black mb-2 group-hover:text-blue-400 transition">{project.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm md:text-base flex-grow">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold text-gray-500 border border-gray-700 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Button */}
                  <Link href={project.link} target="_blank">
                    <button className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 hover:border-white transition duration-300 flex items-center justify-center gap-2">
                      <Github size={16} />
                      View on GitHub
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-12 flex justify-center">
          <Link href="/projects">
            <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-300">
              View all projects
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
