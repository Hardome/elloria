import type { ComponentProps } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import type { SwiperProps } from 'swiper/react';
import { beforeEach, expect, test as it, vi } from 'vitest';

import MediaGalleryGrid from '../src/pages/home/ui/media-gallery-grid';
import MediaGallery from '../src/shared/ui/media-gallery';

const { swiperInstances } = vi.hoisted(() => {
  return { swiperInstances: [] as SwiperType[] };
});

vi.mock('next/dynamic', async () => {
  const { default: Dialog } = await import('../src/shared/ui/media-slider');
  return { default: () => Dialog };
});

vi.mock('next/image', () => {
  return { default: ({ alt }: ComponentProps<typeof Image>) => <span>{alt}</span> };
});

vi.mock('swiper/react', async () => {
  const { useEffect, useState } = await import('react');
  return {
    Swiper: ({ children, onSwiper, initialSlide = 0 }: SwiperProps) => {
      const [swiper] = useState(() => {
        const instance = { activeIndex: initialSlide, destroyed: false, slideTo: vi.fn() } as unknown as SwiperType;
        swiperInstances.push(instance);
        return instance;
      });
      useEffect(() => {
        onSwiper?.(swiper);
      }, [onSwiper, swiper]);
      return <div>{children}</div>;
    },
    SwiperSlide: 'div',
  };
});

const images = [
  { src: '/first.webp', alt: 'Первое фото' },
  { src: '/second.webp', alt: 'Второе фото' },
];

beforeEach(() => {
  swiperInstances.length = 0;
});

it('синхронизирует карточку с выбранным в диалоге изображением', async () => {
  render(<MediaGallery images={images} sizes={'100vw'} onReady={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Открыть изображение: Первое фото' }));
  const thumbnail = await screen.findByRole('button', { name: 'Показать изображение 2: Второе фото' });
  fireEvent.click(thumbnail);
  expect(thumbnail.getAttribute('aria-current')).toBe('true');
  expect(swiperInstances[0]?.slideTo).toHaveBeenCalledWith(1);
  fireEvent.click(screen.getByRole('button', { name: 'Закрыть галерею' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
});

it.each(['slider', 'grid'])('возвращает фокус на исходную кнопку после закрытия %s', async (variant) => {
  render(
    variant === 'slider' ? <MediaGallery images={images} sizes={'100vw'} /> : <MediaGalleryGrid mediaItems={images} />,
  );
  const opener = screen.getByRole('button', { name: 'Открыть изображение: Второе фото' });
  opener.focus();
  fireEvent.click(opener);
  await screen.findByRole('dialog');
  fireEvent.click(screen.getByRole('button', { name: 'Закрыть галерею' }));
  await waitFor(() => expect(document.activeElement).toBe(opener));
});
