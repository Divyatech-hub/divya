import Link from 'next/link';

export default function FooterNew() {
  return (
    <footer className="bg-black text-white border-t border-gray-800 py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold mb-4">Divyalakshmi</h4>
            <p className="text-gray-500 text-sm">Building AI products. Cloud & Networks enthusiast.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <div className="space-y-2 text-sm">
              <Link href="/" className="text-gray-400 hover:text-white transition block">
                Home
              </Link>
              <Link href="/projects" className="text-gray-400 hover:text-white transition block">
                Projects
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Social</h4>
            <div className="space-y-2 text-sm">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition block">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition block">
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <Link href="mailto:divyalakshmi5804@gmail.com" className="text-gray-400 hover:text-white transition text-sm block">
              Email
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-600 text-sm">© 2026 Divyalakshmi V. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
