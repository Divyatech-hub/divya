export default function Projects() {
  const projects = [
    {
      title: "MoodMelody.AI",
      description: "AI web app generating mood-based background music for content creators. TikTok Tech Jam 3rd place winner.",
      tags: ["React.js", "Gemini AI", "Flask", "Hugging Face"],
      link: "https://github.com/StephanieNhiLe/MoodMelody-AI",
      award: "3rd Place @ TikTok Tech Jam 2024"
    },
    {
      title: "SlugSei – AI Baseball Coach",
      description: "Real-time swing analysis tool using computer vision. Tracks bat speed, launch angle, and compares to MLB benchmarks.",
      tags: ["OpenCV", "TensorFlow", "FastAPI", "Google Cloud"],
      link: "https://github.com/StephanieNhiLe/slugsei"
    },
    {
      title: "PillPal AI",
      description: "AI-powered medication management mobile app for underserved communities. Features pill recognition and chat assistance.",
      tags: ["React Native", "LangChain", "OpenAI API", "Pinecone"],
      link: "https://github.com/StephanieNhiLe/pill-pal"
    },
    {
      title: "CrowdSecure",
      description: "Decentralized blockchain-based crowdfunding platform for charity.",
      tags: ["Python", "Blockchain", "Web3"],
      link: "https://github.com/AashishH15/CrowdSecure",
      award: "Best Cybersecurity Hack @ MHacks"
    },
    {
      title: "AIATL2025",
      description: "AI-powered real-time sports analytics and streaming platform.",
      tags: ["TypeScript", "AI", "Real-time Analytics"],
      link: "https://github.com/Grace-Shao/aiatl2025",
      award: "Runner-Up @ AI ATL Hackathon"
    }
  ];

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group h-full"
          >
            <div className="h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition duration-300 flex flex-col">
              <div className="mb-4">
                {project.award && (
                  <span className="inline-block text-xs font-bold text-yellow-400 mb-2">
                    ⭐ {project.award}
                  </span>
                )}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                  {project.title}
                </h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-5 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-gray-400 bg-gray-800/50 px-2.5 py-1 rounded border border-gray-700/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
