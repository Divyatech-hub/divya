// components

import HeaderNew from '@/components/HeaderNew';
import HeroNew from '@/components/HeroNew';
import AboutNew from '@/components/AboutNew';
import ExperienceNew from '@/components/ExperienceNew';
import ProjectsNew from '@/components/ProjectsNew';
import SkillsNew from '@/components/SkillsNew';
import FooterNew from '@/components/FooterNew';

export default function Home() {
  return (
    <main className="bg-black">
      <HeaderNew />
      <HeroNew />
      <AboutNew />
      <ExperienceNew />
      <ProjectsNew />
      <SkillsNew />
      <FooterNew />
    </main>
  );
}
