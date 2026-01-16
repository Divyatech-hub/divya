export default function PersonalStory() {
  const stories = [
    {
      title: "Hiking & Nature",
      description: "Exploring scenic trails and mountains. Love the peace and perspective that comes from being outdoors."
    },
    {
      title: "Photography",
      description: "Capturing moments from travels and events. Photography helps me see the world differently."
    },
    {
      title: "Cooking",
      description: "Experimenting with recipes and cuisines from around the world. Food is a universal language."
    },
    {
      title: "Mentoring",
      description: "Helping others grow and succeed in tech. Sharing knowledge and experiences is deeply fulfilling."
    },
    {
      title: "Traveling",
      description: "Exploring new places and cultures. Each trip brings new perspectives and unforgettable memories."
    },
    {
      title: "Reading",
      description: "Diving into books on technology, philosophy, and innovation. Always learning and growing."
    }
  ];

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">Beyond Code</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {stories.map((story, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-5 hover:border-pink-500/30 transition">
            <h3 className="text-base font-bold text-white mb-2">{story.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{story.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
