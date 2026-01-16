import Link from 'next/link';
import Image from 'next/image';
import { Send, Download, Github } from 'lucide-react';

export default function HeroNew() {
  // const stats = [
  //   { icon: '👔', number: '5', label: 'Internships and Jobs' },
  //   { icon: '🏆', number: '3', label: 'Hackathon Wins' },
  //   { icon: '⭐', number: '4', label: 'Global Awards' },
  //   { icon: '📁', number: '20', label: 'Projects' }
  // ];

  return (
    <section className="min-h-screen bg-black text-white flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div>
            {/* Tagline */}
            <div className="text-blue-400 text-sm font-bold tracking-widest mb-6 uppercase">
              Cloud, Networks, and AI Enthusiast
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4 tracking-tight">
              Hello, I'm
            </h1>
            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-8 tracking-tight text-blue-400">
              Divyalakshmi V.P.
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              CS + Math @ Michigan State University | Google Women TechMakers Ambassador | GDG MSU President | Leader | Innovator
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="mailto:divyalakshmi5804@gmail.com">
                <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition flex items-center justify-center gap-2">
                  <Send size={18} />
                  Contact me
                </button>
              </Link>
              <Link href="#resume">
                <button className="px-8 py-3 bg-transparent border border-white text-white font-bold rounded-full hover:border-blue-400 hover:text-blue-400 transition flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download CV
                </button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-16">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition group">
                <span className="text-2xl font-bold">in</span>
                <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-300">LinkedIn</span>
              </a>
              <a href="https://devpost.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition group">
                <span className="text-2xl font-bold">D</span>
                <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-300">Devpost</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition group">
                <Github size={24} />
                <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-300">GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Column - Image & Stats */}
          <div className="relative h-96 md:h-[550px] hidden md:flex items-center justify-center">
            {/* Mild Blue Gradient Background - Centered with photo */}
            <div className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/50 via-blue-400/30 to-blue-600/50 rounded-full opacity-60 blur-xl"></div>
            
            {/* Profile Photo Container */}
            <div className="relative z-10 w-80 h-80 md:w-[360px] md:h-[360px] rounded-full border-4 border-white/20 overflow-hidden shadow-2xl flex items-center justify-center bg-gray-900">
              <Image
                src="/images/profile.jpg"
                alt="Divyalakshmi"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 45%' }}
                priority
              />
            </div>

            {/* Floating Stat Cards */}
            {/* Top Right */}
            {/* <div className="absolute top-8 right-8 z-20 bg-white text-gray-900 rounded-lg px-5 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{stats[0].icon}</div>
                <div>
                  <div className="font-black text-lg">{stats[0].number}</div>
                  <div className="text-xs font-semibold text-gray-700 whitespace-nowrap">{stats[0].label}</div>
                </div>
              </div>
            </div> */}

            {/* Middle Right */}
            {/* <div className="absolute top-1/2 -right-4 z-20 bg-white text-gray-900 rounded-lg px-5 py-3 shadow-lg transform -translate-y-1/2">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{stats[3].icon}</div>
                <div>
                  <div className="font-black text-lg">{stats[3].number}</div>
                  <div className="text-xs font-semibold text-gray-700">{stats[3].label}</div>
                </div>
              </div>
            </div> */}

            {/* Bottom Left */}
            {/* <div className="absolute bottom-12 left-0 z-20 bg-white text-gray-900 rounded-lg px-5 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{stats[1].icon}</div>
                <div>
                  <div className="font-black text-lg">{stats[1].number}</div>
                  <div className="text-xs font-semibold text-gray-700 whitespace-nowrap">{stats[1].label}</div>
                </div>
              </div>
            </div> */}

            {/* Bottom Right */}
            {/* <div className="absolute bottom-24 right-4 z-20 bg-white text-gray-900 rounded-lg px-5 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{stats[2].icon}</div>
                <div>
                  <div className="font-black text-lg">{stats[2].number}</div>
                  <div className="text-xs font-semibold text-gray-700 whitespace-nowrap">{stats[2].label}</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

