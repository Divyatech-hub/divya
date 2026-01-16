export default function WorkExperience() {
  const experiences = [
    {
      title: "AI Engineer Intern (Fellowship)",
      company: "ASAPP x Break Through Tech",
      period: "Sep 2025 – Dec 2025",
      description: "Led a team of 5 to build an AI-powered platform extracting structured data from 10,000+ customer service conversations using Next.js, Python, FastAPI, and Gemini AI.",
      tags: ["Next.js", "Python", "FastAPI", "Gemini AI"]
    },
    {
      title: "Software Automation Intern",
      company: "Nucor Corporation",
      period: "May 2025 – Aug 2025",
      description: "Automated Oracle EBS test cases with Tosca and Azure DevOps. Built RAG chatbot reducing doc search from minutes to seconds. 1st place Nucor hackathon winner.",
      tags: ["Azure DevOps", "C#", "Python", "Copilot Studio"]
    },
    {
      title: "Full-Stack Developer",
      company: "ViaLearn",
      period: "Mar 2025 – Jul 2025",
      description: "Led team of 4 to develop an AI-powered productivity mobile app for students with auto-scheduling and assignment submission features.",
      tags: ["Flutter", "Firebase", "Python", "LangChain"]
    },
    {
      title: "Software Engineering Intern – Site Reliability",
      company: "TechSmith",
      period: "May 2024 – Aug 2024",
      description: "Worked on Cloud Native infrastructure including Kubernetes and Prometheus. Extended automation code bases for 5+ services.",
      tags: ["Kubernetes", "Docker", "Terraform", "Go"]
    }
  ];

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Experience</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-900"></div>
        
        {/* Timeline items */}
        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="md:ml-20">
              {/* Timeline dot */}
              <div className="absolute -left-2 md:left-0 w-4 h-4 bg-blue-400 rounded-full border-2 border-black shadow-lg shadow-blue-500/50"></div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-blue-500/30 transition">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <span className="text-sm text-gray-500 flex-shrink-0">{exp.period}</span>
                </div>
                <p className="text-sm text-blue-400 font-semibold mb-3">{exp.company}</p>
                <p className="text-base text-gray-300 leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-semibold text-blue-300 bg-blue-950/50 px-3 py-1.5 rounded-full border border-blue-800/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
