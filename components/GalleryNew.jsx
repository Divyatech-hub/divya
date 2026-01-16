export default function GalleryNew() {
  const photos = [
    { title: "Hiking Adventures", emoji: "⛰️" },
    { title: "Travel Moments", emoji: "🌍" },
    { title: "Photography", emoji: "📷" },
    { title: "Cooking Creations", emoji: "👨‍🍳" },
    { title: "Community Events", emoji: "👥" },
    { title: "Conference Highlights", emoji: "🎤" }
  ];

  return (
    <section className="bg-black text-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-3 md:px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Gallery</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((photo, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg aspect-square flex items-center justify-center border border-gray-700 group-hover:border-white transition">
                <div className="text-center">
                  <div className="text-6xl mb-4">{photo.emoji}</div>
                  <p className="text-gray-400 font-medium">{photo.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 border border-gray-800 rounded-lg text-center">
          <p className="text-gray-400">Photos coming soon... Add your own memories here!</p>
        </div>
      </div>
    </section>
  );
}
