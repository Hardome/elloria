import AboutSection from './about-section';
import LoopedVideoSection from './looped-video-section';
import MediaSection from './media-section';
import ProjectsSection from './projects-section';

export default function Home() {
  return (
    <main className={'min-h-screen bg-background'}>
      <LoopedVideoSection />
      <AboutSection />
      <MediaSection />
      <ProjectsSection />
    </main>
  );
}
