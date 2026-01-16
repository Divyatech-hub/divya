export default function ExperienceNew() {
  const experiences = [
    {
      title: "AI Engineer Intern",
      company: "ASAPP x Break Through Tech",
      period: "Sep 2025 – Dec 2025",
      highlight: "Led team of 5 on AI-powered data extraction platform",
      logo: "🤖"
    },
    {
      title: "Software Automation Intern",
      company: "Nucor Corporation",
      period: "May 2025 – Aug 2025",
      highlight: "Built RAG chatbot. 1st place hackathon winner",
      logo: "⚙️"
    },
    {
      title: "Full-Stack Developer",
      company: "ViaLearn",
      period: "Mar 2025 – Jul 2025",
      highlight: "Led team of 4. AI productivity mobile app",
      logo: "📱"
    },
    {
      title: "SRE Intern",
      company: "TechSmith",
      period: "May 2024 – Aug 2024",
      highlight: "Cloud native infrastructure & automation",
      logo: "☁️"
    }
  ];

  return (
    <section className="bg-black text-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-5xl md:text-6xl font-black mb-16 tracking-tight">Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="border border-gray-800 rounded-lg p-8 hover:border-white transition duration-300">
              <div className="flex gap-4 mb-4">
                <div className="text-4xl">{exp.logo}</div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-2">
                    <h3 className="text-2xl md:text-3xl font-black">{exp.title}</h3>
                    <span className="text-gray-500 text-sm md:text-base">{exp.period}</span>
                  </div>
                  <p className="text-lg text-blue-400 font-bold mb-2">{exp.company}</p>
                  <p className="text-gray-300 text-lg">{exp.highlight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
