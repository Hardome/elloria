'use client';

import type { ComponentProps } from 'react';

import { X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { Keyboard, Navigation, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useDialogMediaSlider } from './use-dialog-media-slider';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/ui/dialog';

interface ImageItem {
  src: string;
  alt: string;
}

interface DialogMediaSliderProps {
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  onCloseAutoFocus?: ComponentProps<typeof DialogContent>['onCloseAutoFocus'];
}

const DialogMediaSlider = ({
  images,
  currentIndex,
  onClose,
  onIndexChange,
  onCloseAutoFocus,
}: DialogMediaSliderProps) => {
  const {
    thumbs,
    setThumbs,
    zoomScale,
    handleZoomChange,
    zoomIn,
    zoomOut,
    handleSlideChange,
    handleSwiperInit,
    minZoom,
    maxZoom,
  } = useDialogMediaSlider(currentIndex, images.length, onIndexChange);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onCloseAutoFocus={onCloseAutoFocus}
        className={[
          'inset-0 top-0 left-0 z-[1000] flex h-dvh w-full max-w-none translate-x-0',
          'translate-y-0 flex-col gap-0 rounded-none border-0 bg-black/90 p-0 sm:max-w-none',
        ].join(' ')}
      >
        <DialogTitle className={'sr-only'}>{'Просмотр изображений'}</DialogTitle>
        <DialogDescription className={'sr-only'}>
          {'Используйте стрелки для переключения изображений, Escape для закрытия.'}
        </DialogDescription>
        {/* header */}
        <div className={'flex items-center justify-between p-4 text-white'}>
          <span>
            {currentIndex + 1}
            {' / '}
            {images.length}
          </span>
          <div className={'flex items-center gap-1'}>
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={zoomOut}
              disabled={zoomScale <= minZoom}
              className={'text-white'}
              aria-label={'Уменьшить'}
            >
              <ZoomOut />
            </Button>
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={zoomIn}
              disabled={zoomScale >= maxZoom}
              className={'text-white'}
              aria-label={'Увеличить'}
            >
              <ZoomIn />
            </Button>
            <Button variant={'ghost'} size={'icon'} onClick={onClose} aria-label={'Закрыть галерею'}>
              <X />
            </Button>
          </div>
        </div>

        {/* main swiper */}
        <div className={'relative flex-1'}>
          <Swiper
            modules={[Navigation, Thumbs, Zoom, Keyboard]}
            navigation={true}
            thumbs={{ swiper: thumbs }}
            zoom={{
              maxRatio: maxZoom,
              minRatio: minZoom,
              panOnMouseMove: false,
            }}
            keyboard={true}
            initialSlide={currentIndex}
            onSwiper={handleSwiperInit}
            onZoomChange={handleZoomChange}
            onSlideChange={handleSlideChange}
            className={'h-full'}
            style={
              {
                '--swiper-theme-color': '#fff',
              } as React.CSSProperties
            }
          >
            {images.map((item) => (
              <SwiperSlide key={item.src}>
                <div className={'swiper-zoom-container relative flex h-full items-center justify-center'}>
                  <Image
                    src={item.src}
                    alt={item.alt || ''}
                    fill={true}
                    sizes={'100vw'}
                    className={'object-contain select-none'}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* thumbs */}
        <div className={'p-2'}>
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbs}
            slidesPerView={'auto'}
            spaceBetween={8}
            watchSlidesProgress={true}
            className={'h-20 w-fit'}
          >
            {images.map((item, index) => (
              <SwiperSlide
                key={item.src}
                className={[
                  '!w-auto [&.swiper-slide-thumb-active]:rounded',
                  '[&.swiper-slide-thumb-active]:border-3',
                  '[&.swiper-slide-thumb-active]:border-primary',
                ].join(' ')}
              >
                <button
                  type={'button'}
                  onClick={() => onIndexChange(index)}
                  aria-label={`Показать изображение ${index + 1}: ${item.alt}`}
                  aria-current={currentIndex === index ? 'true' : undefined}
                  className={[
                    'block size-20 cursor-pointer rounded focus-visible:outline-2',
                    'focus-visible:outline-offset-2 focus-visible:outline-primary',
                  ].join(' ')}
                >
                  <Image
                    src={item.src}
                    alt={item.alt || ''}
                    className={'h-full rounded object-cover select-none'}
                    width={80}
                    height={80}
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMediaSlider;
