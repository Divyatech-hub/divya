export default function Awards() {
  const awards = [
    { title: "AWS All Builders Welcome Grant Recipient", org: "AWS re:Invent", year: "2025" },
    { title: "Harvard WECode Scholar", org: "Harvard University", year: "2025" },
    { title: "Cole Excellence Scholarship", org: "MSU Honors College", year: "2023" },
    { title: "Google Cloud Digital Leader Certification", org: "Google Cloud", year: "2023" },
    { title: "Honors Excellence Scholarship", org: "Michigan State University", year: "2022–2026" },
    { title: "The Diana Award", org: "Gift of Sight - Philanthropic Project", year: "2020" }
  ];

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Awards & Recognition</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {awards.map((award, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-5 hover:border-cyan-500/30 transition">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="text-base font-bold text-white">{award.title}</h3>
              <span className="text-xs text-gray-500 flex-shrink-0">{award.year}</span>
            </div>
            <p className="text-sm text-cyan-400 font-semibold">{award.org}</p>
          </div>
        ))}
      </div>
    </>
  );
}
