'use client';

export default function CreativePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-cyan-500 border-opacity-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold neon-gradient">DVP</div>
          <div className="hidden md:flex gap-8 text-sm font-mono">
            <a href="/#projects" className="link-underline">PROJECTS</a>
            <a href="/#awards" className="link-underline">AWARDS</a>
            <a href="/#leadership" className="link-underline">LEADERSHIP</a>
            <a href="/#experience" className="link-underline">EXPERIENCE</a>
            <a href="/#interface" className="link-underline">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* CREATIVE EXPRESSIONS Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black via-gray-950 to-black animate-fade-in pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-6xl font-bold">
                <span className="text-white">CREATIVE</span>
                <br />
                <span className="neon-gradient">EXPRESSIONS</span>
              </h1>
              <p className="text-gray-400 font-mono text-sm">// Beyond algorithms and code: exploring poetry, literature, and visual art</p>
            </div>

            {/* POETRY Section */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold magenta-lead">// POETRY & WRITING</h2>
                <p className="text-gray-400 font-mono text-sm">// Thoughts, reflections, and creative prose</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Untitled',
                    excerpt: 'Lines of code blur into thoughts,\nEach keystroke a meditation.\nBuilding worlds from empty space,\nFinding poetry in logic.',
                    date: '2024'
                  },
                  {
                    title: 'Digital Dreams',
                    excerpt: 'In the glow of screens,\nWe find ourselves reflected.\nNeon lights dancing with possibilities,\nInfinite pathways waiting to be explored.',
                    date: '2024'
                  },
                  {
                    title: 'Reflection',
                    excerpt: 'Growth is not linear,\nIt spirals, it loops back,\nBut each turn brings clarity.\nEach cycle brings strength.',
                    date: '2023'
                  },
                  {
                    title: 'Momentum',
                    excerpt: 'Ideas collide in conversations,\nPassion meets preparation,\nAnd suddenly, the impossible\nBecomes inevitable.',
                    date: '2023'
                  },
                ].map((poem, i) => (
                  <div key={i} className="glass rounded-lg p-8 neon-border-cyan hover-lift space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-400 mb-1">{poem.title}</h3>
                      <p className="text-gray-400 font-mono text-xs">{poem.date}</p>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{poem.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* READING Section */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold magenta-lead">// CURRENTLY READING</h2>
                <p className="text-gray-400 font-mono text-sm">// Books, ideas, and literary inspiration</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'The Innovators',
                    author: 'Walter Isaacson',
                    status: 'Currently Reading',
                    desc: 'Exploring the history of computing and the brilliant minds who shaped the digital age',
                    genre: 'Tech History'
                  },
                  {
                    title: 'Educated',
                    author: 'Tara Westover',
                    status: 'Recently Finished',
                    desc: 'A powerful memoir about education, resilience, and the transformative power of learning',
                    genre: 'Memoir'
                  },
                  {
                    title: 'Braiding Sweetgrass',
                    author: 'Robin Wall Kimmerer',
                    status: 'On Reading List',
                    desc: 'Indigenous wisdom and scientific knowledge intertwined - exploring our relationship with nature',
                    genre: 'Essays'
                  },
                  {
                    title: 'Project Hail Mary',
                    author: 'Andy Weir',
                    status: 'Recently Finished',
                    desc: 'A thrilling sci-fi adventure blending hard science with humor and heart',
                    genre: 'Science Fiction'
                  },
                  {
                    title: 'Thinking, Fast and Slow',
                    author: 'Daniel Kahneman',
                    status: 'On Reading List',
                    desc: 'Understanding cognitive biases and decision-making processes in human behavior',
                    genre: 'Psychology'
                  },
                  {
                    title: 'The Midnight Library',
                    author: 'Matt Haig',
                    status: 'Recently Finished',
                    desc: 'A beautiful exploration of choices, possibilities, and finding meaning in life',
                    genre: 'Fiction'
                  },
                ].map((book, i) => (
                  <div key={i} className="glass rounded-lg p-6 neon-border-magenta hover-lift space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-cyan-400">{book.title}</h3>
                      <p className="text-magenta-400 font-mono text-sm">{book.author}</p>
                    </div>
                    <p className="text-gray-400 text-xs font-mono tracking-widest">{book.status}</p>
                    <p className="text-gray-300 text-sm">{book.desc}</p>
                    <div className="pt-2 border-t border-cyan-500 border-opacity-20">
                      <span className="text-cyan-400 font-mono text-xs">{book.genre}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ARTWORK Section */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold magenta-lead">// VISUAL ART</h2>
                <p className="text-gray-400 font-mono text-sm">// Design, illustration, and creative visual work</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Digital Landscapes',
                    desc: 'Exploring serene digital environments and abstract compositions',
                    img: '/art1.jpg',
                    medium: 'Digital Illustration'
                  },
                  {
                    title: 'Neon Aesthetics',
                    desc: 'Playing with vibrant neon colors and futuristic design elements',
                    img: '/art2.jpg',
                    medium: 'Digital Design'
                  },
                  {
                    title: 'Conceptual Thinking',
                    desc: 'Visual representations of abstract ideas and complex concepts',
                    img: '/art3.jpg',
                    medium: 'Mixed Media'
                  },
                  {
                    title: 'Nature & Tech',
                    desc: 'Blending organic forms with digital and technological elements',
                    img: '/art4.jpg',
                    medium: 'Digital Illustration'
                  },
                ].map((art, i) => (
                  <div key={i} className="group space-y-4">
                    <div className="relative h-80 overflow-hidden rounded-lg glass hover-lift">
                      <img
                        src={art.img}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition"></div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-cyan-400">{art.title}</h3>
                      <p className="text-gray-400 text-sm">{art.desc}</p>
                      <p className="text-magenta-400 font-mono text-xs">{art.medium}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing Statement */}
            <div className="py-12 rounded-lg neon-border-cyan glass p-8 text-center space-y-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                Creativity fuels innovation. Whether through code, words, or visual expression, I believe in the power of bringing ideas to life and exploring the intersection of art and technology.
              </p>
            </div>

            <div className="text-center pt-12">
              <a href="/" className="text-magenta-400 font-mono text-sm link-underline">← BACK_TO_HOME</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500 border-opacity-20 py-8 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-gray-500 font-mono text-xs">
            © 2025 DIVYALAKSHMI V.P. | Crafted with AI & DevOps passion | BUILT WITH NEXT.JS + NEON_AESTHETICS
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </div>
      </footer>
    </div>
  );
}