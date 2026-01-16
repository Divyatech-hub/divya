'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AboutNew() {
  const [hoveredId, setHoveredId] = useState(null);

  const photos = [
    {
      id: 1,
      emoji: '🎓',
      fact: 'CS + Math @ MSU',
      title: 'Student'
    },
    {
      id: 2,
      emoji: '💻',
      fact: 'Love building AI products',
      title: 'Builder'
    },
    {
      id: 3,
      emoji: '⛰️',
      fact: 'Hiking enthusiast',
      title: 'Adventurer'
    },
    {
      id: 4,
      emoji: '📸',
      fact: 'Photography lover',
      title: 'Creator'
    },
    {
      id: 5,
      emoji: '🤝',
      fact: 'Mentor & Leader',
      title: 'Mentor'
    },
    {
      id: 6,
      emoji: '🚀',
      fact: '20+ projects shipped',
      title: 'Innovator'
    }
  ];

  return (
    <section className="bg-black text-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-3 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">About me</h2>
        <p className="text-gray-400 mb-16 max-w-2xl text-lg">
          CS + Math student building AI products. Cloud & Networks enthusiast. Passionate about creating innovative solutions.
        </p>

        {/* Photo Collage Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Base Photo Container */}
              <div
                className={`w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center transition-all duration-500 transform ${
                  hoveredId === photo.id
                    ? 'blur-md scale-110 opacity-30'
                    : 'blur-none scale-100 opacity-100'
                }`}
              >
                <div className="text-6xl md:text-8xl">{photo.emoji}</div>
              </div>

              {/* Fun Fact Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-500/90 to-blue-700/90 flex flex-col items-center justify-center p-6 transition-all duration-500 ${
                  hoveredId === photo.id
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
              >
                <p className="text-white font-black text-center text-sm md:text-base leading-tight">
                  {photo.fact}
                </p>
              </div>

              {/* Border */}
              <div className="absolute inset-0 border-2 border-gray-700 rounded-lg group-hover:border-white transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* About Text */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <h3 className="text-2xl font-black text-white">The Story</h3>
            <p>
              I'm a computer science and mathematics student at Michigan State University, passionate about building AI-powered products that solve real problems.
            </p>
            <p>
              Currently, I'm exploring the intersection of cloud infrastructure, AI agents, and innovative applications. I love working with teams to bring ideas to life, whether it's through hackathons or internships.
            </p>
          </div>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <h3 className="text-2xl font-black text-white">Beyond Coding</h3>
            <p>
              Beyond coding, I enjoy hiking, photography, mentoring other engineers, and exploring new cuisines. I believe in lifelong learning and pushing boundaries.
            </p>
            <p>
              Let's build something great together. Whether you want to collaborate on a project, chat about AI & cloud tech, or grab coffee—I'm always up for connecting!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
