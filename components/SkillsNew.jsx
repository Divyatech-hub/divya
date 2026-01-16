export default function SkillsNew() {
  const skills = {
    "Languages": ["Python", "JavaScript", "TypeScript", "Java", "C++", "Go"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "Vue"],
    "Backend": ["FastAPI", "Django", "Node.js", "FastAPI"],
    "Cloud & DevOps": ["AWS", "Google Cloud", "Kubernetes", "Docker", "Terraform"],
    "AI/ML": ["LangChain", "Gemini AI", "TensorFlow", "PyTorch", "OpenAI"],
    "Tools": ["Git", "Azure DevOps", "CI/CD", "Figma"]
  };

  return (
    <section className="bg-black text-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-5xl md:text-6xl font-black mb-12 tracking-tight">Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl font-bold mb-4">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span key={skill} className="px-4 py-2 border border-gray-700 rounded-full text-sm font-medium text-gray-300 hover:border-blue-400 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
