import type { Metadata } from 'next';

export function createSocialMetadata(
  title: string,
  description: string,
  url: string,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = 'https://elloria.ru/topPerspective3.webp';

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: 'ELLORIA',
      images: [{ url: image, width: 1200, height: 630, alt: 'ELLORIA — вид сверху' }],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
