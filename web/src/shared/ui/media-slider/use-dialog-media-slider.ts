'use client';
import { useEffect, useRef, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';

const ZOOM_STEPS = [1, 1.25, 1.5, 2, 2.5, 3] as const;
const MIN_ZOOM = ZOOM_STEPS[0];
const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1];

export function useDialogMediaSlider(currentIndex: number, imageCount: number, onIndexChange: (index: number) => void) {
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
    if (mainSwiperRef.current && currentIndex >= 0 && currentIndex < imageCount) {
      mainSwiperRef.current.slideTo(currentIndex);
    }
  }, [currentIndex, imageCount]);

  const handleSlideChange = (swiper: SwiperType) => {
    setZoomScale(MIN_ZOOM);
    onIndexChange(swiper.activeIndex);
  };

  const handleZoomChange = (_swiper: SwiperType, scale: number) => {
    setZoomScale(scale);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    mainSwiperRef.current = swiper;
  };

  return {
    thumbs,
    setThumbs,
    zoomScale,
    handleZoomChange,
    zoomIn,
    zoomOut,
    handleSlideChange,
    handleSwiperInit,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
  };
}
