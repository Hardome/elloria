import {H2} from '@/components/ui/typography';

import MediaGalleryGrid from './MediaGalleryGrid';

const mediaItems = [
  {src: '/topPerspective.webp', alt: 'Вид сверху на поселок'},
  {src: '/topPerspective2.webp', alt: 'Жизнь в поселке'},
  {src: '/architecture.webp', alt: 'Архитектура домов'},
  {src: '/road3.webp', alt: 'Сервисы поселка'}
];

const MediaGallery = () => (
  <section id={'media'} className={'py-20 lg:py-32 bg-muted/30'}>
    <div className={'container mx-auto px-4 lg:px-8'}>
      <H2 variant={'section'} className={'mb-16 text-primary'}>
        {'Медиа'}
      </H2>

      <div className={'mb-12 rounded-2xl overflow-hidden shadow-medium'}>
        <div className={'aspect-video bg-muted flex items-center justify-center'}>
          <video
            title={'Обзор поселка'}
            src={'/review.webm'}
            controls={true}
            playsInline={true}
            poster={'/review-poster.webp'}
            preload={'none'}
            className={'w-full h-full object-cover'}
            aria-label={'Видео обзор поселка ELLORIA'}
          />
        </div>
      </div>
      <MediaGalleryGrid mediaItems={mediaItems} />
    </div>
  </section>
);

export default MediaGallery;
