import HeaderNew from '@/components/HeaderNew';
import ProjectsGridNew from '@/components/ProjectsGridNew';
import GalleryNew from '@/components/GalleryNew';
import FooterNew from '@/components/FooterNew';

export default function ProjectsPage() {
  return (
    <div className="bg-black">
      <HeaderNew />
      <ProjectsGridNew />
      <GalleryNew />
      <FooterNew />
    </div>
  );
}
