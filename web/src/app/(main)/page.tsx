import AboutSection from './Sections/About';
import LoopedVideoSection from './Sections/LoopedVideo';
import MediaSection from './Sections/Media';
import ProjectsSection from './Sections/Projects';

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
