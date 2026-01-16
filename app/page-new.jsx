import HeroNew from '@/components/HeroNew';
import ExperienceNew from '@/components/ExperienceNew';
import ProjectsNew from '@/components/ProjectsNew';
import HackathonsNew from '@/components/HackathonsNew';
import AwardsNew from '@/components/AwardsNew';
import SkillsNew from '@/components/SkillsNew';
import FooterNew from '@/components/FooterNew';

export default function Home() {
  return (
    <main className="bg-black">
      <HeroNew />
      <ExperienceNew />
      <ProjectsNew />
      <HackathonsNew />
      <AwardsNew />
      <SkillsNew />
      <FooterNew />
    </main>
  );
}
