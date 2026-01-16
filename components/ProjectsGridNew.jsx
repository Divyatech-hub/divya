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
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">Projects</h1>
        <p className="text-gray-400 text-sm mb-12 max-w-2xl">Check out some of my projects here</p>
        
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group flex flex-col md:flex-row gap-6 items-start">
              {/* Image */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg aspect-video md:aspect-square flex items-center justify-center text-5xl group-hover:scale-105 transition duration-300">
                  {project.image}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-900 text-gray-300 rounded border border-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title and Date */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                  <Link href={project.link} target="_blank">
                    <h2 className="text-xl md:text-2xl font-black group-hover:text-blue-400 transition cursor-pointer">
                      {project.name}
                    </h2>
                  </Link>
                  <span className="text-xs md:text-sm text-blue-400 font-bold whitespace-nowrap">{project.date}</span>
                </div>

                {/* Award */}
                {project.award && (
                  <p className="text-xs text-yellow-400 font-bold mb-2">★ {project.award}</p>
                )}

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* All Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 border border-gray-700 text-gray-400 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

