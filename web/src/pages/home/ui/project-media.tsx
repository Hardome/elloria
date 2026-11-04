'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const MediaGallery = dynamic(() => import('@/shared/ui/media-gallery'), { ssr: false });

const imageSizes = [
  '(min-width: 1536px) 712px',
  '(min-width: 1280px) 584px',
  '(min-width: 1024px) 456px',
  '(min-width: 768px) 352px',
  '(min-width: 640px) 608px',
  'calc(100vw - 32px)',
].join(', ');

interface ProjectMediaProps {
  images: { src: string; alt: string }[];
}

const ProjectMedia = ({ images }: ProjectMediaProps) => {
  const [isGalleryReady, setIsGalleryReady] = useState(false);

  return (
    <div className={'group relative aspect-[4/3] overflow-hidden'}>
      {!isGalleryReady && (
        <Image src={images[0].src} alt={images[0].alt} fill={true} sizes={imageSizes} className={'object-cover'} />
      )}
      <MediaGallery images={images} sizes={imageSizes} onReady={() => setIsGalleryReady(true)} />
    </div>
  );
};

export default ProjectMedia;
