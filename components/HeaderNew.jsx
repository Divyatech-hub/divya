import Link from 'next/link';

export default function HeaderNew() {
  return (
    <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center font-black text-white text-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition">
              D
            </div>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          <Link href="/" className="text-sm font-medium text-white hover:text-blue-400 transition pb-2 border-b-2 border-blue-400">
            Home
          </Link>
          <Link href="/projects" className="text-sm font-medium text-gray-400 hover:text-white transition pb-2 border-b-2 border-transparent hover:border-blue-400">
            My Projects
          </Link>
          <a href="mailto:divyalakshmi5804@gmail.com" className="text-sm font-medium text-gray-400 hover:text-white transition pb-2 border-b-2 border-transparent hover:border-blue-400">
            Contact
          </a>
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex w-10 h-10 rounded-full border border-gray-600 items-center justify-center hover:border-white/50 transition text-gray-400 hover:text-white">
            🌙
          </button>
        </div>
      </div>
    </header>
  );
}
