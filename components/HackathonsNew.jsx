export default function HackathonsNew() {
  const hackathons = [
    {
      event: "Nucor Hackathon",
      placement: "🥇 1st Place",
      project: "Agentic AI Safety Platform",
      year: 2025
    },
    {
      event: "TikTok Tech Jam",
      placement: "🥉 3rd Place Worldwide",
      project: "MoodMelody.AI",
      year: 2024,
      prize: "$3,000"
    },
    {
      event: "AI ATL Hackathon",
      placement: "🏆 Runner-Up",
      project: "HypeZone - Sports Analytics",
      year: 2025
    },
    {
      event: "AnitaB.org AI Hackathon",
      placement: "Top 8 Global",
      project: "AI for Social Good",
      year: 2024
    },
    {
      event: "MHacks",
      placement: "🛡️ Best Cybersecurity",
      project: "CrowdSecure",
      year: 2023
    },
    {
      event: "ShellHacks",
      placement: "Honorable Mention",
      project: "IncluScript.ai",
      year: 2023
    }
  ];

  return (
    <section className="bg-black text-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-3 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Hackathon Wins</h2>
        
        <div className="grid md:grid-cols-3 gap-5">
          {hackathons.map((hack, idx) => (
            <div key={idx} className="border border-gray-800 rounded-lg p-6 hover:border-blue-400 transition">
              <div className="text-2xl font-black mb-2">{hack.placement}</div>
              <h3 className="font-bold text-lg mb-1">{hack.event}</h3>
              <p className="text-gray-400 text-sm mb-3">{hack.project}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-xs">{hack.year}</span>
                {hack.prize && <span className="text-yellow-400 text-xs font-bold">{hack.prize}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
