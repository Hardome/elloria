'use client';

import React, { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

const DialogMediaSlider = dynamic(() => import('@/shared/ui/media-slider'), { ssr: false });

interface MediaGalleryProps {
  images: { src: string; alt: string }[];
  sizes: string;
  onReady?: () => void;
}

const MediaGallery = ({ images, sizes, onReady }: MediaGalleryProps) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper && !swiper.destroyed && swiper.activeIndex !== active) {
      swiper.slideTo(active);
    }
  }, [active]);

  return (
    <React.Fragment>
      <Swiper
        modules={[Navigation]}
        navigation={true}
        onSlideChange={(s) => setActive(s.activeIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          onReady?.();
        }}
        className={'h-full w-full overflow-hidden rounded-xl'}
        style={
          {
            '--swiper-theme-color': '#fff',
          } as React.CSSProperties
        }
      >
        {images.map((image, i) => (
          <SwiperSlide key={image.src} className={'relative bg-card'}>
            <button
              type={'button'}
              className={[
                'absolute inset-0 size-full cursor-pointer focus-visible:outline-2',
                'focus-visible:outline-offset-[-4px] focus-visible:outline-primary',
              ].join(' ')}
              aria-label={`Открыть изображение: ${image.alt}`}
              onClick={(evt) => {
                openerRef.current = evt.currentTarget;
                setActive(i);
                setOpen(true);
              }}
            >
              <Image
                src={image.src}
                alt={image.alt || ''}
                fill={true}
                sizes={sizes}
                className={'object-cover select-none'}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      {open && (
        <DialogMediaSlider
          images={images}
          currentIndex={active}
          onClose={() => setOpen(false)}
          onIndexChange={setActive}
          onCloseAutoFocus={(evt) => {
            evt.preventDefault();
            openerRef.current?.focus({ preventScroll: true });
          }}
        />
      )}
    </React.Fragment>
  );
};

export default MediaGallery;
