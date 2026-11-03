import { getPlaces, getProjects, getSite, getTravelStats, getWins } from "@/lib/content";
import { StoryView } from "@/components/story/StoryView";
import { ListView } from "@/components/site/ListView";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  const site = getSite();
  const projects = getProjects();
  const wins = getWins();
  const places = getPlaces();
  const stats = getTravelStats(places);
  const data = { site, projects, wins, places, stats };

  return (
    <>
      {/* Both views are real HTML. CSS shows one, based on data-mode on <html>. */}
      <main id="main">
        <div className="story-only">
          <StoryView {...data} />
        </div>
        <div className="skip-only">
          <ListView {...data} />
        </div>
      </main>
      <Footer site={site} />
    </>
  );
}
