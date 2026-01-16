import Link from 'next/link';

export default function ProjectsGridNew() {
  const projects = [
    {
      name: "MoodMelody.AI",
      description: "AI music generation for content creators",
      tags: ["React", "Gemini AI", "Flask"],
      link: "https://github.com/StephanieNhiLe/MoodMelody-AI",
      date: "2024",
      image: "🎵",
      award: "3rd Place - TikTok Tech Jam"
    },
    {
      name: "SlugSei – AI Baseball Coach",
      description: "Real-time swing analysis using computer vision",
      tags: ["OpenCV", "TensorFlow", "FastAPI"],
      link: "https://github.com/StephanieNhiLe/slugsei",
      date: "2024",
      image: "⚾"
    },
    {
      name: "PillPal AI",
      description: "Medication management app for underserved communities",
      tags: ["React Native", "LangChain", "OpenAI"],
      link: "https://github.com/StephanieNhiLe/pill-pal",
      date: "2024",
      image: "💊"
    },
    {
      name: "CrowdSecure",
      description: "Blockchain-based crowdfunding platform",
      tags: ["Python", "Web3", "Smart Contracts"],
      link: "https://github.com/AashishH15/CrowdSecure",
      date: "2023",
      image: "🔗",
      award: "Best Cybersecurity"
    },
    {
      name: "AIATL2025",
      description: "AI-powered real-time sports analytics platform",
      tags: ["TypeScript", "AI", "Real-time Analytics"],
      link: "https://github.com/Grace-Shao/aiatl2025",
      date: "2025",
      image: "📊",
      award: "Award Winner"
    },
    {
      name: "IncluScript.ai",
      description: "AI accessibility tool for inclusive scripting",
      tags: ["AI", "Accessibility", "NLP"],
      link: "https://github.com",
      date: "2023",
      image: "♿"
    }
  ];

  return (
    <section className="bg-black text-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-3 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Projects</h1>
        <p className="text-gray-400 text-sm mb-12 max-w-2xl">Check out some of my projects here</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="group cursor-pointer h-full">
              <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-white transition duration-300 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 h-40 md:h-48 flex items-center justify-center text-5xl md:text-6xl group-hover:scale-110 transition duration-300">
                  {project.image}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {project.award && (
                    <span className="inline-block text-xs font-bold text-yellow-400 mb-2 w-fit">★ {project.award}</span>
                  )}
                  <Link href={project.link} target="_blank">
                    <h3 className="text-lg md:text-xl font-black mb-1 group-hover:text-blue-400 transition cursor-pointer">{project.name}</h3>
                  </Link>
                  <p className="text-gray-400 mb-3 text-xs md:text-sm flex-grow">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold text-gray-500 border border-gray-700 rounded-full px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

