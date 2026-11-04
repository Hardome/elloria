'use client';

import {useEffect, useRef, useState} from 'react';
import {X, ZoomIn, ZoomOut} from 'lucide-react';
import Image from 'next/image';
import type {Swiper as SwiperType} from 'swiper';
import {Keyboard, Navigation, Thumbs, Zoom} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogDescription, DialogTitle} from '@/components/ui/dialog';

const ZOOM_STEPS = [1, 1.25, 1.5, 2, 2.5, 3] as const;
const MIN_ZOOM = ZOOM_STEPS[0];
const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1];

interface ImageItem {
  src: string;
  alt: string;
}

interface DialogMediaSliderProps {
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onThumbnailClick: (index: number) => void;
}

const DialogMediaSlider = ({
  images,
  currentIndex,
  onClose,
  onThumbnailClick
}: DialogMediaSliderProps) => {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  const zoomIn = () => {
    const swiper = mainSwiperRef.current;

    if (!swiper?.zoom?.enabled) {
      return;
    }

    const next = ZOOM_STEPS.find((s) => s > zoomScale) ?? MAX_ZOOM;

    if (next > zoomScale) {
      swiper.zoom.in(next);
    }
  };

  const zoomOut = () => {
    const swiper = mainSwiperRef.current;

    if (!swiper?.zoom?.enabled) {
      return;
    }

    const prev = [...ZOOM_STEPS].reverse().find((s) => s < zoomScale) ?? MIN_ZOOM;

    if (prev < zoomScale) {
      if (prev === 1) {
        swiper.zoom.out();
      } else {
        swiper.zoom.in(prev);
      }
    }
  };

  useEffect(() => {
    if (
      mainSwiperRef.current &&
      currentIndex >= 0 &&
      currentIndex < images.length
    ) {
      mainSwiperRef.current.slideTo(currentIndex);
    }
  }, [currentIndex, images.length]);

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;

    onThumbnailClick(newIndex);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    mainSwiperRef.current = swiper;
    swiper.on('zoomChange', (_s, scale) => {
      setZoomScale(scale);
    });
    swiper.on('slideChange', () => {
      setZoomScale(1);
    });
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={
          'inset-0 top-0 left-0 z-[1000] flex h-dvh w-full max-w-none sm:max-w-none ' +
          'translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-black/90 p-0'
        }
      >
        <DialogTitle className={'sr-only'}>{'Просмотр изображений'}</DialogTitle>
        <DialogDescription className={'sr-only'}>
          {'Используйте стрелки для переключения изображений, Escape для закрытия.'}
        </DialogDescription>
        {/* header */}
        <div className={'flex justify-between items-center p-4 text-white'}>
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
              disabled={zoomScale <= MIN_ZOOM}
              className={'text-white'}
              aria-label={'Уменьшить'}
            >
              <ZoomOut />
            </Button>
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={zoomIn}
              disabled={zoomScale >= MAX_ZOOM}
              className={'text-white'}
              aria-label={'Увеличить'}
            >
              <ZoomIn />
            </Button>
            <Button
              variant={'ghost'}
              size={'icon'}
              onClick={onClose}
              aria-label={'Закрыть галерею'}
            >
              <X />
            </Button>
          </div>
        </div>

        {/* main swiper */}
        <div className={'relative flex-1'}>
          <Swiper
            modules={[Navigation, Thumbs, Zoom, Keyboard]}
            navigation={true}
            thumbs={{swiper: thumbs}}
            zoom={
              {
                maxRatio: MAX_ZOOM,
                minRatio: MIN_ZOOM,
                panOnMouseMove: false
              }
            }
            keyboard={true}
            initialSlide={currentIndex}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            className={'h-full'}
            style={
              {
                '--swiper-theme-color': '#fff'
              } as React.CSSProperties
            }
          >
            {
              images.map((item) => (
                <SwiperSlide key={item.src}>
                  <div
                    className={
                      'swiper-zoom-container relative flex items-center justify-center h-full'
                    }
                  >
                    <Image
                      src={item.src}
                      alt={item.alt || ''}
                      fill={true}
                      sizes={'100vw'}
                      className={'object-contain select-none'}
                    />
                  </div>
                </SwiperSlide>
              ))
            }
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
            {
              images.map((item, index) => (
                <SwiperSlide
                  key={item.src}
                  className={
                    `
                          !w-auto
                          [&.swiper-slide-thumb-active]:border-3
                          [&.swiper-slide-thumb-active]:border-primary
                          [&.swiper-slide-thumb-active]:rounded
                          `
                  }
                >
                  <button
                    type={'button'}
                    onClick={() => onThumbnailClick(index)}
                    aria-label={`Показать изображение ${index + 1}: ${item.alt}`}
                    aria-current={currentIndex === index ? 'true' : undefined}
                    className={
                      'block size-20 rounded cursor-pointer ' +
                            'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
                            'focus-visible:outline-primary'
                    }
                  >
                    <Image
                      src={item.src}
                      alt={item.alt || ''}
                      className={'object-cover h-full rounded select-none'}
                      width={80}
                      height={80}
                    />
                  </button>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMediaSlider;
