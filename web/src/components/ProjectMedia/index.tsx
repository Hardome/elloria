'use client';

import {useState} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MediaGallery = dynamic(() => import('@/components/MediaGallery'), {ssr: false});

interface ProjectMediaProps {
  images: {src: string; alt: string}[];
}

const ProjectMedia = ({images}: ProjectMediaProps) => {
  const [isGalleryReady, setIsGalleryReady] = useState(false);

  return (
    <div className={'relative aspect-[4/3] overflow-hidden group'}>
      {
        !isGalleryReady && (
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill={true}
            sizes={'(max-width: 768px) 100vw, 50vw'}
            className={'object-cover'}
          />
        )
      }
      <MediaGallery images={images} onReady={() => setIsGalleryReady(true)} />
    </div>
  );
};

export default ProjectMedia;
