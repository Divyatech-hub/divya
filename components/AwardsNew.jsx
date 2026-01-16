export default function AwardsNew() {
  const awards = [
    { title: "AWS All Builders Grant", org: "AWS re:Invent", year: 2025 },
    { title: "Harvard WECode Scholar", org: "Harvard University", year: 2025 },
    { title: "Cole Excellence Scholarship", org: "MSU Honors College", year: 2023 },
    { title: "Google Cloud Certification", org: "Google Cloud", year: 2023 },
    { title: "Honors Excellence", org: "Michigan State University", year: "2022-26" },
    { title: "The Diana Award", org: "Gift of Sight", year: 2020 }
  ];

  return (
    <section className="bg-black text-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-5xl md:text-6xl font-black mb-12 tracking-tight">Awards & Achievements</h2>
        
        <div className="space-y-6">
          {awards.map((award, idx) => (
            <div key={idx} className="flex items-start justify-between gap-8 pb-6 border-b border-gray-800 last:border-0">
              <div>
                <h3 className="text-xl font-bold mb-1">{award.title}</h3>
                <p className="text-blue-400 font-semibold text-sm">{award.org}</p>
              </div>
              <span className="text-gray-600 text-sm flex-shrink-0">{award.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
