'use client';

import { Fragment, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const DialogMediaSlider = dynamic(() => import('@/components/DialogMediaSlider'), { ssr: false });

interface MediaItem {
  src: string;
  alt: string;
}

interface MediaGalleryGridProps {
  mediaItems: MediaItem[];
}

const MediaGalleryGrid = ({ mediaItems }: MediaGalleryGridProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <Fragment>
      <div className={'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'}>
        {mediaItems.map((item, index) => (
          <button
            key={item.src}
            type={'button'}
            className={[
              'group aspect-square cursor-pointer overflow-hidden rounded-lg shadow-soft',
              'transition-all duration-300 hover:shadow-medium focus-visible:outline-2',
              'focus-visible:outline-offset-2 focus-visible:outline-primary',
            ].join(' ')}
            onClick={() => openLightbox(index)}
            aria-label={`Открыть изображение: ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={300}
              height={300}
              className={'h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'}
            />
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <DialogMediaSlider
          images={mediaItems.map((item) => {
            return { src: item.src, alt: item.alt };
          })}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onThumbnailClick={openLightbox}
        />
      )}
    </Fragment>
  );
};

export default MediaGalleryGrid;
