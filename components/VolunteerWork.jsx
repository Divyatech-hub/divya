export default function VolunteerWork() {
  const volunteer = [
    {
      role: "Google Developer Groups (GDG) President",
      org: "Michigan State University",
      period: "Oct 2023 – Present",
      description: "Founded and led MSU's GDG chapter with 415+ members. Hosted 10+ technical workshops on Google Cloud tools, Flutter, Firebase, and AI."
    },
    {
      role: "Hackathon Mentor",
      org: "Various Competitions",
      description: "Mentored teams at university and community hackathons, providing guidance on project development and best practices."
    },
    {
      role: "STEM Outreach Volunteer",
      org: "Local Schools & Events",
      description: "Taught coding and robotics to K-12 students. Participated in community STEM education initiatives."
    },
    {
      role: "Community Service",
      org: "Local Community",
      description: "Participated in food drives, environmental cleanups, and local charity events to give back to the community."
    }
  ];

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Volunteer & Community</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {volunteer.map((v, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-green-500/30 transition">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-white mb-1">{v.role}</h3>
              <p className="text-sm text-green-400 font-semibold mb-2">{v.org}</p>
              {v.period && <span className="text-xs text-gray-500">{v.period}</span>}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
