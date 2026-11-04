'use client';

import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const DialogMediaSlider = dynamic(() => import('@/components/DialogMediaSlider'), {ssr: false});

interface MediaGalleryProps {
  images: {src: string; alt: string}[];
  onReady?: () => void;
}

const MediaGallery = ({images, onReady}: MediaGalleryProps) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      {/* inline slider */}
      <Swiper
        modules={[Navigation]}
        navigation={true}
        onSlideChange={(s) => setActive(s.activeIndex)}
        onSwiper={onReady}
        className={'w-full rounded-xl overflow-hidden h-full'}
        style={
          {
            '--swiper-theme-color': '#fff'
          } as React.CSSProperties
        }
      >
        {
          images.map((image, i) => (
            <SwiperSlide key={image.src} className={'relative bg-card'}>
              <button
                type={'button'}
                className={
                  'absolute inset-0 size-full cursor-pointer ' +
                  'focus-visible:outline-2 focus-visible:outline-offset-[-4px] ' +
                  'focus-visible:outline-primary'
                }
                aria-label={`Открыть изображение: ${image.alt}`}
                onClick={
                  () => {
                    setActive(i);
                    setOpen(true);
                  }
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt || ''}
                  fill={true}
                  sizes={'(max-width: 768px) 100vw, 50vw'}
                  className={'object-cover select-none'}
                />
              </button>
            </SwiperSlide>
          ))
        }
      </Swiper>
      {
        open && (
          <DialogMediaSlider
            images={images}
            currentIndex={active}
            onClose={() => setOpen(false)}
            onThumbnailClick={setActive}
          />
        )
      }
    </React.Fragment>
  );
};

export default MediaGallery;
