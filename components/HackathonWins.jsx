export default function HackathonWins() {
  const hackathons = [
    {
      event: "Nucor Hackathon",
      placement: "1st Place",
      project: "Agentic AI Safety Platform",
      year: "2025"
    },
    {
      event: "TikTok Tech Jam",
      placement: "3rd Place Worldwide",
      project: "MoodMelody.AI - AI Music Generation",
      year: "2024",
      prize: "$3,000"
    },
    {
      event: "AI ATL Hackathon",
      placement: "Runner-Up",
      project: "HypeZone - Real-Time AI Sports Analytics",
      year: "2025"
    },
    {
      event: "AnitaB.org Responsible AI Hackathon",
      placement: "Global Top 8",
      project: "AI for Social Good",
      year: "2024"
    },
    {
      event: "MHacks",
      placement: "Best Cybersecurity Hack",
      project: "CrowdSecure - Blockchain Crowdfunding",
      year: "2023"
    },
    {
      event: "ShellHacks",
      placement: "Honorable Mention - AI in Accessibility",
      project: "IncluScript.ai",
      year: "2023"
    }
  ];

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Hackathon Wins</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {hackathons.map((hack, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-5 hover:border-purple-500/30 transition group">
            <div className="mb-3">
              <div className="inline-block text-xs font-bold text-purple-400 bg-purple-950/50 px-2.5 py-1 rounded-full border border-purple-800/50 mb-2">
                {hack.placement}
              </div>
              {hack.prize && <div className="text-xs text-yellow-400 font-semibold mt-1">🏆 {hack.prize}</div>}
            </div>
            <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-400 transition">{hack.event}</h3>
            <p className="text-sm text-gray-300 mb-2">{hack.project}</p>
            <span className="text-xs text-gray-500">{hack.year}</span>
          </div>
        ))}
      </div>
    </>
  );
}
